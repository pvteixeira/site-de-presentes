import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: true, messages: [], isConfigured: false });
    }

    const { data, error } = await supabase
      .from('guestbook_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar mensagens:', error);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, messages: data || [], isConfigured: true });
  } catch (err: any) {
    console.error('Erro no endpoint guestbook:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { author, relation, text } = body;

    if (!author || !text) {
      return NextResponse.json({ success: false, message: 'Nome e texto são obrigatórios.' }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: false, message: 'Banco de dados não configurado.' }, { status: 503 });
    }

    const newMsg = {
      id: Date.now().toString(),
      author: String(author).trim(),
      relation: String(relation || 'Convidado Especial').trim(),
      text: String(text).trim(),
      date: new Date().toLocaleDateString('pt-BR'),
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('guestbook_messages')
      .insert([newMsg])
      .select()
      .single();

    if (error) {
      console.error('Erro ao salvar mensagem no Supabase:', error);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Mensagem salva com sucesso!', data });
  } catch (err: any) {
    console.error('Erro no endpoint guestbook POST:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID da mensagem não fornecido.' }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: false, message: 'Banco de dados não configurado.' }, { status: 503 });
    }

    const { error } = await supabase
      .from('guestbook_messages')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar mensagem:', error);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Mensagem excluída com sucesso!' });
  } catch (err: any) {
    console.error('Erro no endpoint guestbook DELETE:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
