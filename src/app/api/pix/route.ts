import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { sendPixNotificationEmail } from '@/lib/email';

export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: true, contributions: [], isConfigured: false });
    }

    const { data, error } = await supabase
      .from('pix_contributions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar comprovantes PIX:', error);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    const formatted = (data || []).map((c: any) => ({
      id: c.id,
      giftId: c.gift_id,
      giftName: c.gift_name,
      guestName: c.guest_name,
      amount: Number(c.amount),
      date: c.date,
      receiptUrl: c.receipt_url,
      receiptName: c.receipt_name
    }));

    return NextResponse.json({ success: true, contributions: formatted, isConfigured: true });
  } catch (err: any) {
    console.error('Erro no endpoint pix GET:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { giftId, giftName, guestName, amount, receiptUrl, receiptName, isManual } = body;

    const cleanGuestName = String(guestName || '').trim();
    const numAmount = Number(amount);

    if (!giftId || !cleanGuestName || isNaN(numAmount) || numAmount <= 0) {
      return NextResponse.json({ success: false, message: 'Dados incompletos para envio de PIX (informe o presente, seu nome e valor).' }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: false, message: 'Banco de dados não configurado.' }, { status: 503 });
    }

    const currentDateStr = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newContrib = {
      id: 'pix-' + Date.now().toString() + '-' + Math.random().toString(36).substring(2, 6),
      gift_id: String(giftId),
      gift_name: String(giftName || 'Presente Especial'),
      guest_name: cleanGuestName,
      amount: numAmount,
      date: currentDateStr,
      receipt_url: receiptUrl || null,
      receipt_name: receiptName || (isManual ? 'Registro Manual' : 'Comprovante_PIX.png'),
      created_at: new Date().toISOString()
    };

    // 1. Salvar o registro da contribuição
    const { data: contribData, error: contribError } = await supabase
      .from('pix_contributions')
      .insert([newContrib])
      .select()
      .single();

    if (contribError) {
      console.error('Erro ao registrar comprovante no Supabase:', contribError);
      return NextResponse.json({ success: false, message: contribError.message }, { status: 500 });
    }

    // 2. Atualizar o valor arrecadado do presente no banco
    const { data: giftData } = await supabase
      .from('gifts')
      .select('current_amount')
      .eq('id', String(giftId))
      .single();

    if (giftData) {
      const updatedAmount = Number(giftData.current_amount || 0) + numAmount;
      await supabase
        .from('gifts')
        .update({ current_amount: updatedAmount })
        .eq('id', String(giftId));
    }

    // 3. Disparar notificação por e-mail para os noivos (sem travar a resposta)
    if (!isManual) {
      try {
        sendPixNotificationEmail({
          guestName: cleanGuestName,
          giftName: String(giftName || 'Presente Especial'),
          amount: numAmount,
          date: currentDateStr,
          receiptName: receiptName || 'Comprovante_PIX.png',
          receiptUrl: receiptUrl || null
        }).catch((err) => console.error('[EMAIL] Erro no envio assíncrono do aviso de PIX:', err));
      } catch (emailErr) {
        console.error('[EMAIL] Erro não impeditivo ao disparar aviso aos noivos:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Comprovante e contribuição salvos com sucesso!',
      contribution: contribData
    });
  } catch (err: any) {
    console.error('Erro no endpoint pix POST:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const all = searchParams.get('all') === 'true';

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: false, message: 'Banco não configurado.' }, { status: 503 });
    }

    if (all) {
      const { error } = await supabase.from('pix_contributions').delete().neq('id', '0');
      if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      // Zera o arrecadado de todos os presentes no banco
      await supabase.from('gifts').update({ current_amount: 0 }).neq('id', '0');
      return NextResponse.json({ success: true, message: 'Todos os comprovantes foram apagados e metas zeradas.' });
    }

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID não fornecido.' }, { status: 400 });
    }

    // Busca os dados da contribuição para subtrair do presente correspondente
    const { data: contrib } = await supabase
      .from('pix_contributions')
      .select('gift_id, amount')
      .eq('id', id)
      .single();

    const { error } = await supabase.from('pix_contributions').delete().eq('id', id);
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    if (contrib && contrib.gift_id && contrib.amount) {
      const { data: giftData } = await supabase
        .from('gifts')
        .select('current_amount')
        .eq('id', String(contrib.gift_id))
        .single();

      if (giftData) {
        const newAmount = Math.max(0, Number(giftData.current_amount || 0) - Number(contrib.amount));
        await supabase
          .from('gifts')
          .update({ current_amount: newAmount })
          .eq('id', String(contrib.gift_id));
      }
    }

    return NextResponse.json({ success: true, message: 'Registro excluído e valor do presente ajustado.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
