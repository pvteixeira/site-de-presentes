import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

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
    const { giftId, giftName, guestName, amount, receiptUrl, receiptName } = body;

    if (!giftId || !guestName || !amount) {
      return NextResponse.json({ success: false, message: 'Dados incompletos para envio de PIX.' }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: false, message: 'Banco de dados não configurado.' }, { status: 503 });
    }

    const newContrib = {
      id: Date.now().toString(),
      gift_id: String(giftId),
      gift_name: String(giftName || 'Presente Especial'),
      guest_name: String(guestName).trim(),
      amount: Number(amount),
      date: new Date().toLocaleString('pt-BR'),
      receipt_url: receiptUrl || null,
      receipt_name: receiptName || 'Comprovante_PIX.png',
      created_at: new Date().toISOString()
    };

    // 1. Salvar o registro da contribuição
    const { data: contribData, error: contribError } = await supabase
      .from('pix_contributions')
      .insert([newContrib])
      .select()
      .single();

    if (contribError) {
      console.error('Erro ao registrar comprovante:', contribError);
      return NextResponse.json({ success: false, message: contribError.message }, { status: 500 });
    }

    // 2. Atualizar o valor arrecadado do presente no banco
    const { data: giftData } = await supabase
      .from('gifts')
      .select('current_amount')
      .eq('id', String(giftId))
      .single();

    if (giftData) {
      const updatedAmount = Number(giftData.current_amount || 0) + Number(amount);
      await supabase
        .from('gifts')
        .update({ current_amount: updatedAmount })
        .eq('id', String(giftId));
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
      return NextResponse.json({ success: true, message: 'Todos os comprovantes foram apagados.' });
    }

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID não fornecido.' }, { status: 400 });
    }

    const { error } = await supabase.from('pix_contributions').delete().eq('id', id);
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Registro excluído.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
