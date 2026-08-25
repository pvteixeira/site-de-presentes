import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { INITIAL_SCHEDULE } from '@/app/data/padrinhosData';

export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: true, schedule: INITIAL_SCHEDULE, isConfigured: false });
    }

    const { data, error } = await supabase
      .from('wedding_schedule')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Erro ao buscar cronograma:', error);
      return NextResponse.json({ success: true, schedule: INITIAL_SCHEDULE });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ success: true, schedule: INITIAL_SCHEDULE });
    }

    const formatted = data.map((s: any) => ({
      id: s.id,
      time: s.time,
      title: s.title,
      description: s.description || ''
    }));

    return NextResponse.json({ success: true, schedule: formatted, isConfigured: true });
  } catch (err: any) {
    console.error('Erro no endpoint schedule GET:', err);
    return NextResponse.json({ success: true, schedule: INITIAL_SCHEDULE });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, item, items } = body;

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: false, message: 'Banco de dados não configurado.' }, { status: 503 });
    }

    if (action === 'reset') {
      await supabase.from('wedding_schedule').delete().neq('id', '0');
      const initialRows = INITIAL_SCHEDULE.map((s, idx) => ({
        id: s.id,
        time: s.time,
        title: s.title,
        description: s.description || '',
        order_index: idx,
        created_at: new Date().toISOString()
      }));
      await supabase.from('wedding_schedule').insert(initialRows);
      return NextResponse.json({ success: true, schedule: INITIAL_SCHEDULE });
    }

    if (action === 'save_all' && Array.isArray(items)) {
      await supabase.from('wedding_schedule').delete().neq('id', '0');
      const rows = items.map((s, idx) => ({
        id: s.id || 'sch-' + Date.now() + '-' + idx,
        time: s.time,
        title: s.title,
        description: s.description || '',
        order_index: idx,
        created_at: new Date().toISOString()
      }));
      await supabase.from('wedding_schedule').insert(rows);
      return NextResponse.json({ success: true, schedule: items });
    }

    if (item) {
      const row = {
        id: item.id || 'sch-' + Date.now(),
        time: item.time,
        title: item.title,
        description: item.description || '',
        order_index: 99,
        created_at: new Date().toISOString()
      };
      const { data, error } = await supabase.from('wedding_schedule').upsert(row).select().single();
      if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      return NextResponse.json({ success: true, item: data });
    }

    return NextResponse.json({ success: false, message: 'Requisição inválida.' }, { status: 400 });
  } catch (err: any) {
    console.error('Erro no endpoint schedule POST:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID não informado.' }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: false, message: 'Banco não configurado.' }, { status: 503 });
    }

    const { error } = await supabase.from('wedding_schedule').delete().eq('id', id);
    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    return NextResponse.json({ success: true, message: 'Item excluído.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
