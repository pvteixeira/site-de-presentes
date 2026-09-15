import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { sendRsvpConfirmationEmail } from '@/lib/email';

export interface RsvpConfirmation {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  status: 'confirmed' | 'declined';
  guest_count: number;
  companion_names?: string;
  notes?: string;
  date: string;
  created_at?: string;
}

export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: true, confirmations: [], isConfigured: false });
    }

    const { data, error } = await supabase
      .from('rsvp_confirmations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar confirmações de presença:', error);
      return NextResponse.json({ success: false, message: error.message, confirmations: [] }, { status: 500 });
    }

    return NextResponse.json({ success: true, confirmations: data || [], isConfigured: true });
  } catch (err: any) {
    console.error('Erro no endpoint rsvp GET:', err);
    return NextResponse.json({ success: false, message: err.message, confirmations: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, status, guestCount, companionNames, notes } = body;

    const cleanName = String(name || '').trim();
    if (!cleanName || cleanName.length < 3) {
      return NextResponse.json({ success: false, message: 'Nome completo é obrigatório (mínimo de 3 caracteres).' }, { status: 400 });
    }
    if (cleanName.length > 80) {
      return NextResponse.json({ success: false, message: 'Nome muito longo (máximo de 80 caracteres).' }, { status: 400 });
    }

    const finalStatus: 'confirmed' | 'declined' = status === 'declined' ? 'declined' : 'confirmed';
    const finalCount = finalStatus === 'confirmed' ? Math.min(3, Math.max(1, parseInt(guestCount, 10) || 1)) : 0;

    const rawPhone = String(phone || '').replace(/\D/g, '');
    const cleanEmail = String(email || '').trim().toLowerCase();
    const allowedEmailDomains = ['@gmail.com', '@outlook.com', '@icloud.com', '@hotmail.com'];
    const isAllowedEmail = allowedEmailDomains.some((d) => cleanEmail.endsWith(d));

    if (finalStatus === 'confirmed') {
      if (!rawPhone || rawPhone.length < 10 || rawPhone.length > 11) {
        return NextResponse.json({ 
          success: false, 
          message: 'Para confirmar presença na festa, informe um número de telefone com DDD válido (10 ou 11 dígitos).' 
        }, { status: 400 });
      }

      if (!cleanEmail) {
        return NextResponse.json({ 
          success: false, 
          message: 'Para confirmar presença na festa, informe o seu e-mail para receber a confirmação.' 
        }, { status: 400 });
      }
      if (cleanEmail.length < 6 || cleanEmail.length > 80) {
        return NextResponse.json({ 
          success: false, 
          message: 'O e-mail deve ter entre 6 e 80 caracteres.' 
        }, { status: 400 });
      }
      if (!isAllowedEmail) {
        return NextResponse.json({ 
          success: false, 
          message: 'E-mail não permitido. Aceitamos apenas contas @gmail.com, @outlook.com ou @icloud.com.' 
        }, { status: 400 });
      }
    } else {
      if (rawPhone && (rawPhone.length < 10 || rawPhone.length > 11)) {
        return NextResponse.json({ 
          success: false, 
          message: 'Telefone inválido (deve conter 10 ou 11 dígitos).' 
        }, { status: 400 });
      }
      if (cleanEmail) {
        if (cleanEmail.length < 6 || cleanEmail.length > 80) {
          return NextResponse.json({ 
            success: false, 
            message: 'O e-mail deve ter entre 6 e 80 caracteres.' 
          }, { status: 400 });
        }
        if (!isAllowedEmail) {
          return NextResponse.json({ 
            success: false, 
            message: 'E-mail não permitido. Aceitamos apenas contas @gmail.com, @outlook.com ou @icloud.com.' 
          }, { status: 400 });
        }
      }
    }

    const newRsvp: RsvpConfirmation = {
      id: 'rsvp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      name: cleanName,
      email: cleanEmail,
      phone: rawPhone ? String(phone).trim().substring(0, 20) : '',
      status: finalStatus,
      guest_count: finalCount,
      companion_names: companionNames ? String(companionNames).trim().substring(0, 250) : '',
      notes: notes ? String(notes).trim().substring(0, 500) : '',
      date: new Date().toLocaleDateString('pt-BR'),
      created_at: new Date().toISOString(),
    };

    // Disparo de e-mail de confirmação automático (se e-mail fornecido)
    let emailStatus = { sent: false, error: null as string | null };
    if (newRsvp.email) {
      try {
        const mailRes = await sendRsvpConfirmationEmail({
          name: newRsvp.name,
          email: newRsvp.email,
          status: newRsvp.status,
          guestCount: newRsvp.guest_count,
          companionNames: newRsvp.companion_names,
          notes: newRsvp.notes,
        });
        emailStatus = { sent: mailRes.success, error: mailRes.message || null };
      } catch (mailErr: any) {
        console.error('Erro não impeditivo ao enviar e-mail de confirmação:', mailErr);
        emailStatus = { sent: false, error: mailErr?.message || 'Erro no envio de e-mail' };
      }
    }

    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from('rsvp_confirmations')
        .insert([newRsvp])
        .select()
        .single();

      if (error) {
        console.error('Erro ao salvar RSVP no Supabase:', error);
        // Retorna o objeto criado com flag de fallback caso a tabela ainda não tenha sido criada no Supabase
        return NextResponse.json({ 
          success: true, 
          message: 'Confirmação registrada com sucesso.', 
          data: newRsvp, 
          email: emailStatus,
          supabaseError: error.message 
        });
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Presença confirmada com sucesso!', 
        data, 
        email: emailStatus 
      });
    }

    // Se Supabase não estiver configurado
    return NextResponse.json({ 
      success: true, 
      message: 'Presença registrada com sucesso!', 
      data: newRsvp, 
      email: emailStatus,
      isConfigured: false 
    });
  } catch (err: any) {
    console.error('Erro no endpoint rsvp POST:', err);
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
      return NextResponse.json({ success: true, message: 'Operação concluída localmente.' });
    }

    if (all) {
      const { error } = await supabase.from('rsvp_confirmations').delete().neq('id', '');
      if (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: 'Todas as confirmações foram removidas.' });
    }

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID não fornecido.' }, { status: 400 });
    }

    const { error } = await supabase.from('rsvp_confirmations').delete().eq('id', id);
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Confirmação excluída com sucesso!' });
  } catch (err: any) {
    console.error('Erro no endpoint rsvp DELETE:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
