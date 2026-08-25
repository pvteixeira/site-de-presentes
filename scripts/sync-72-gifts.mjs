import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
  'https://lwiwdvfnqhdjnnqfmzyb.supabase.co',
  'sb_publishable_rMl2lC774sBqCzBaLPmfUA_Htf7dA_r'
);

async function syncAll72Gifts() {
  const content = fs.readFileSync('./src/app/utils/giftsData.ts', 'utf-8');
  
  // Extract JSON array from file
  const startIdx = content.indexOf('[');
  const endIdx = content.lastIndexOf(']');
  const arrayString = content.substring(startIdx, endIdx + 1);

  // Evaluate the array safely
  const giftsData = eval(arrayString);

  console.log(`Lendo ${giftsData.length} presentes do arquivo giftsData.ts...`);

  // 1. Limpar tabela de presentes para remover os 24 antigos de teste
  await supabase.from('gifts').delete().neq('id', '0');

  // 2. Preparar todos os 72 presentes
  const items = giftsData.map(g => ({
    id: String(g.id),
    name: g.name,
    description: g.description || '',
    category: g.category || 'Geral',
    total_amount: Number(g.totalAmount),
    current_amount: Number(g.currentAmount || 0),
    image_url: g.imageUrl || '/img/aline_e_klecio.jpg'
  }));

  // 3. Inserir em lotes no Supabase
  const { error } = await supabase.from('gifts').insert(items);

  if (error) {
    console.error('Erro ao sincronizar os 72 presentes:', error);
  } else {
    console.log(`✓ Sucesso! Todos os ${items.length} presentes oficiais foram salvos no Supabase!`);
  }
}

syncAll72Gifts();
