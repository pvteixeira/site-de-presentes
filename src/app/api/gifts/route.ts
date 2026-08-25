import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { GIFTS_DATA } from '@/app/utils/giftsData';

export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: true, gifts: GIFTS_DATA, isConfigured: false });
    }

    const { data, error } = await supabase
      .from('gifts')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Erro ao buscar presentes do Supabase:', error);
      return NextResponse.json({ success: true, gifts: GIFTS_DATA, isConfigured: true });
    }

    // Se o banco ainda não tiver os presentes inseridos, retorna a lista inicial e faz seed opcional
    if (!data || data.length === 0) {
      return NextResponse.json({ success: true, gifts: GIFTS_DATA, isConfigured: true, isDefault: true });
    }

    // Map fields to match the Gift interface (camelCase)
    const formattedGifts = data.map((g: any) => ({
      id: g.id,
      name: g.name,
      description: g.description || '',
      category: g.category || 'Geral',
      totalAmount: Number(g.total_amount),
      currentAmount: Number(g.current_amount || 0),
      imageUrl: g.image_url || '/img/aline_e_klecio.jpg'
    }));

    return NextResponse.json({ success: true, gifts: formattedGifts, isConfigured: true });
  } catch (err: any) {
    console.error('Erro no endpoint gifts:', err);
    return NextResponse.json({ success: true, gifts: GIFTS_DATA });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, gift, giftsList } = body;

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: false, message: 'Banco de dados não configurado.' }, { status: 503 });
    }

    // Ação especial: Inicializar/sincronizar banco com a lista completa inicial
    if (action === 'seed' && Array.isArray(giftsList)) {
      const itemsToInsert = giftsList.map((g: any) => ({
        id: String(g.id),
        name: g.name,
        description: g.description,
        category: g.category,
        total_amount: Number(g.totalAmount),
        current_amount: Number(g.currentAmount || 0),
        image_url: g.imageUrl
      }));

      const { error } = await supabase.from('gifts').upsert(itemsToInsert);
      if (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: 'Presentes sincronizados no banco com sucesso!' });
    }

    // Salvar ou atualizar presente individual
    if (gift) {
      const itemToUpsert = {
        id: String(gift.id || Date.now().toString()),
        name: gift.name,
        description: gift.description || '',
        category: gift.category || 'Geral',
        total_amount: Number(gift.totalAmount),
        current_amount: Number(gift.currentAmount || 0),
        image_url: gift.imageUrl || '/img/aline_e_klecio.jpg'
      };

      const { data, error } = await supabase
        .from('gifts')
        .upsert(itemToUpsert)
        .select()
        .single();

      if (error) {
        console.error('Erro ao salvar presente:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: 'Presente salvo!', gift: data });
    }

    return NextResponse.json({ success: false, message: 'Dados inválidos.' }, { status: 400 });
  } catch (err: any) {
    console.error('Erro no endpoint gifts POST:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID não fornecido.' }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: false, message: 'Banco não configurado.' }, { status: 503 });
    }

    const { error } = await supabase.from('gifts').delete().eq('id', id);
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Presente excluído.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
