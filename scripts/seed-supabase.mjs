import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://lwiwdvfnqhdjnnqfmzyb.supabase.co',
  'sb_publishable_rMl2lC774sBqCzBaLPmfUA_Htf7dA_r'
);

const GIFTS_DATA = [
  {
    id: '1',
    name: 'Cafeteira Nespresso Essenza Mini',
    description: 'Para começarmos nossas manhãs com um café especial e cheio de energia.',
    totalAmount: 480.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80',
    category: 'Eletrodomésticos'
  },
  {
    id: '2',
    name: 'Air Fryer Digital 4L',
    description: 'Praticidade para os jantares rápidos durante a semana a dois.',
    totalAmount: 390.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&auto=format&fit=crop&q=80',
    category: 'Eletrodomésticos'
  },
  {
    id: '3',
    name: 'Jogo de Panelas Cerâmica (5 peças)',
    description: 'Conjunto antiaderente de alta qualidade para prepararmos nossas receitas.',
    totalAmount: 650.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1584990347449-a203f191cb34?w=600&auto=format&fit=crop&q=80',
    category: 'Cozinha'
  },
  {
    id: '4',
    name: 'Aparelho de Jantar 30 Peças Porcelana',
    description: 'Para recebermos vocês com muito carinho e elegância em nossa casa.',
    totalAmount: 720.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&auto=format&fit=crop&q=80',
    category: 'Cozinha'
  },
  {
    id: '5',
    name: 'Faqueiro Inox 101 Peças',
    description: 'Talheres completos e refinados para compor nossa mesa.',
    totalAmount: 520.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1594913785162-e678a0c23ecb?w=600&auto=format&fit=crop&q=80',
    category: 'Cozinha'
  },
  {
    id: '6',
    name: 'Jogo de Cama 400 Fios Queen',
    description: 'Lençóis de algodão acetinado para noites de descanso perfeitas.',
    totalAmount: 430.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=80',
    category: 'Cama e Banho'
  },
  {
    id: '7',
    name: 'Jogo de Toalhas de Banho Fio Penteado',
    description: 'Toalhas macias e de alta absorção para o nosso dia a dia.',
    totalAmount: 290.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=600&auto=format&fit=crop&q=80',
    category: 'Cama e Banho'
  },
  {
    id: '8',
    name: 'Robô Aspirador de Pó Inteligente',
    description: 'Para manter nosso lar sempre limpo e nos dar mais tempo juntos.',
    totalAmount: 950.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=600&auto=format&fit=crop&q=80',
    category: 'Eletrodomésticos'
  },
  {
    id: '9',
    name: 'Jantar Romântico na Lua de Mel',
    description: 'Uma experiência gastronômica inesquecível para brindarmos nosso amor.',
    totalAmount: 500.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
    category: 'Experiências'
  },
  {
    id: '10',
    name: 'Passeio de Barco / Catamarã ao Pôr do Sol',
    description: 'Um momento mágico navegando e celebrando nossa união.',
    totalAmount: 420.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    category: 'Experiências'
  },
  {
    id: '11',
    name: 'Spa Relaxante para o Casal',
    description: 'Massagem e dia de relaxamento para recarregar as energias após o grande dia.',
    totalAmount: 460.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
    category: 'Experiências'
  },
  {
    id: '12',
    name: 'Adega Climatizada 12 Garrafas',
    description: 'Para guardarmos os vinhos dos nossos brindes e comemorações futuras.',
    totalAmount: 890.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop&q=80',
    category: 'Eletrodomésticos'
  },
  {
    id: '13',
    name: 'Conjunto de Taças de Cristal (18 peças)',
    description: 'Taças para vinho tinto, branco e espumante.',
    totalAmount: 380.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
    category: 'Cozinha'
  },
  {
    id: '14',
    name: 'Edredom Plumas Queen Size',
    description: 'Conforto e aconchego para os dias mais frios.',
    totalAmount: 350.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80',
    category: 'Cama e Banho'
  },
  {
    id: '15',
    name: 'Liquidificador e Processador de Alta Potência',
    description: 'Para vitaminas, sucos e preparo prático de alimentos.',
    totalAmount: 320.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80',
    category: 'Eletrodomésticos'
  },
  {
    id: '16',
    name: 'Ferro de Passar a Vapor com Caldeira',
    description: 'Praticidade e cuidado com as roupas do dia a dia.',
    totalAmount: 280.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?w=600&auto=format&fit=crop&q=80',
    category: 'Eletrodomésticos'
  },
  {
    id: '17',
    name: 'Conjunto de Potes Herméticos de Vidro',
    description: 'Para organizar nossa despensa e conservar alimentos frescos.',
    totalAmount: 240.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80',
    category: 'Cozinha'
  },
  {
    id: '18',
    name: 'Diária Extra na Lua de Mel',
    description: 'Para prolongarmos um dia a mais desse momento inesquecível.',
    totalAmount: 600.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
    category: 'Experiências'
  },
  {
    id: '19',
    name: 'Purificador de Água com Refrigeração',
    description: 'Água pura e gelada sempre disponível na nossa casa.',
    totalAmount: 680.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80',
    category: 'Eletrodomésticos'
  },
  {
    id: '20',
    name: 'Tábua de Frios Gourmet em Madeira Nobre',
    description: 'Para nossas noites de queijos e vinhos com a família e amigos.',
    totalAmount: 210.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    category: 'Cozinha'
  },
  {
    id: '21',
    name: 'Micro-ondas com Função Grill',
    description: 'Aquecimento rápido e receitas gratinadas no dia a dia.',
    totalAmount: 580.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&auto=format&fit=crop&q=80',
    category: 'Eletrodomésticos'
  },
  {
    id: '22',
    name: 'Jogo de Assadeiras Antiaderentes',
    description: 'Para assar bolos, tortas e pratos especiais.',
    totalAmount: 190.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80',
    category: 'Cozinha'
  },
  {
    id: '23',
    name: 'Mala de Viagem Grande Rígida 360°',
    description: 'Para nos acompanhar na lua de mel e em todas as futuras viagens.',
    totalAmount: 490.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600&auto=format&fit=crop&q=80',
    category: 'Outros'
  },
  {
    id: '24',
    name: 'Cota de Contribuição Livre para o Casal',
    description: 'Sua presença é o maior presente! Esta cota nos ajuda a montar nosso lar dos sonhos.',
    totalAmount: 300.00,
    currentAmount: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80',
    category: 'Outros'
  }
];

const INITIAL_SCHEDULE = [
  { id: 'sch-1', time: '17h00', title: 'Chegada dos Padrinhos e Noivo', description: 'Recepção, fotos iniciais e posicionamento para o cortejo' },
  { id: 'sch-2', time: '17h45', title: 'Acomodação dos Convidados', description: 'Música ambiente e organização dos convidados na nave' },
  { id: 'sch-3', time: '18h00', title: 'Entrada dos Padrinhos e Cortejo', description: 'Início solene com a entrada dos padrinhos, pajens e daminhas' },
  { id: 'sch-4', time: '18h15', title: 'Entrada da Noiva', description: 'Momento emocionante da marcha nupcial e troca de olhares' },
  { id: 'sch-5', time: '18h30', title: 'Cerimônia e Troca das Alianças', description: 'Votos do casal, bênção solene e entrega das alianças' },
  { id: 'sch-6', time: '19h15', title: 'Sessão de Fotos Oficiais', description: 'Fotos protocolares com padrinhos, pais e familiares' },
  { id: 'sch-7', time: '19h45', title: 'Abertura da Recepção e Coquetel', description: 'Brinde com os convidados e início dos serviços gastronômicos' },
  { id: 'sch-8', time: '21h00', title: 'Dança dos Noivos e Festa', description: 'Abertura da pista de dança com muita alegria e celebração' }
];

async function runSeed() {
  console.log('Sincronizando 24 presentes no Supabase...');
  const items = GIFTS_DATA.map(g => ({
    id: g.id,
    name: g.name,
    description: g.description,
    category: g.category,
    total_amount: g.totalAmount,
    current_amount: 0,
    image_url: g.imageUrl
  }));

  const { error: gErr } = await supabase.from('gifts').upsert(items);
  if (gErr) console.error('Erro gifts:', gErr);
  else console.log('✓ 24 Presentes cadastrados com sucesso no Supabase!');

  console.log('Sincronizando cronograma oficial...');
  const schItems = INITIAL_SCHEDULE.map((s, idx) => ({
    id: s.id,
    time: s.time,
    title: s.title,
    description: s.description,
    order_index: idx
  }));

  const { error: sErr } = await supabase.from('wedding_schedule').upsert(schItems);
  if (sErr) console.error('Erro schedule:', sErr);
  else console.log('✓ Cronograma cadastrado com sucesso no Supabase!');
}

runSeed();
