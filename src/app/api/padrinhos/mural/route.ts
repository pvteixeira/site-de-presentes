import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { INITIAL_ANNOUNCEMENTS } from '@/app/data/padrinhosData';

export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({
        success: true,
        announcements: INITIAL_ANNOUNCEMENTS,
        replies: [],
        isConfigured: false
      });
    }

    const [announcementsRes, repliesRes] = await Promise.all([
      supabase.from('padrinho_announcements').select('*').order('created_at', { ascending: false }),
      supabase.from('padrinho_replies').select('*').order('created_at', { ascending: false })
    ]);

    const formattedAnnouncements = (announcementsRes.data || []).map((a: any) => ({
      id: a.id,
      title: a.title,
      content: a.content,
      author: a.author,
      date: a.date,
      isImportant: Boolean(a.is_important)
    }));

    const formattedReplies = (repliesRes.data || []).map((r: any) => ({
      id: r.id,
      author: r.author,
      text: r.text,
      date: r.date
    }));

    return NextResponse.json({
      success: true,
      announcements: formattedAnnouncements.length > 0 ? formattedAnnouncements : INITIAL_ANNOUNCEMENTS,
      replies: formattedReplies,
      isConfigured: true
    });
  } catch (err: any) {
    console.error('Erro no endpoint mural padrinhos GET:', err);
    return NextResponse.json({ success: true, announcements: INITIAL_ANNOUNCEMENTS, replies: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, announcement, reply } = body;

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: false, message: 'Banco de dados não configurado.' }, { status: 503 });
    }

    // Criar anúncio dos noivos
    if (type === 'announcement' && announcement) {
      const newAnn = {
        id: 'ann-' + Date.now(),
        title: announcement.title,
        content: announcement.content,
        author: announcement.author || 'Aline e Klécio',
        date: new Date().toLocaleDateString('pt-BR'),
        is_important: Boolean(announcement.isImportant),
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('padrinho_announcements')
        .insert([newAnn])
        .select()
        .single();

      if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      return NextResponse.json({ success: true, data });
    }

    // Criar recado de padrinho
    if (type === 'reply' && reply) {
      const newReply = {
        id: Date.now().toString(),
        author: reply.author,
        text: reply.text,
        date: new Date().toLocaleDateString('pt-BR'),
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('padrinho_replies')
        .insert([newReply])
        .select()
        .single();

      if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ success: false, message: 'Tipo de post inválido.' }, { status: 400 });
  } catch (err: any) {
    console.error('Erro no endpoint mural POST:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const type = searchParams.get('type'); // 'announcement' ou 'reply'
    const all = searchParams.get('all') === 'true';

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: false, message: 'Banco não configurado.' }, { status: 503 });
    }

    const table = type === 'announcement' ? 'padrinho_announcements' : 'padrinho_replies';

    if (all) {
      const { error } = await supabase.from(table).delete().neq('id', '0');
      if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      return NextResponse.json({ success: true, message: 'Limpeza concluída.' });
    }

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID não informado.' }, { status: 400 });
    }

    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    return NextResponse.json({ success: true, message: 'Item excluído.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
