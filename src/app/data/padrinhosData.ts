export interface PadrinhoAccount {
  id: string;
  name: string;
  username: string;
  alternateUsernames?: string[];
  role: 'casal' | 'madrinha' | 'padrinho' | 'noivos' | 'demoiselle';
  members: string[];
  customMessage?: string;
  daminha?: string;
  pajem?: string;
  password?: string;
}

export interface PadrinhoMessage {
  id: string;
  date: string;
  title: string;
  content: string;
  author: string;
  isImportant?: boolean;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
}

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sch-1',
    time: '18:30',
    title: 'Chegada dos Padrinhos e Madrinhas',
    description: ''
  },
  {
    id: 'sch-2',
    time: '19:00',
    title: 'Início da Cerimônia',
    description: ''
  },
  {
    id: 'sch-3',
    time: '20:30',
    title: 'Sessão de Fotos na Igreja',
    description: ''
  },
  {
    id: 'sch-4',
    time: '21:00',
    title: 'Recepção',
    description: ''
  }
];

export const PADRINHOS_ACCOUNTS: PadrinhoAccount[] = [
  {
    id: 'aline-klecio',
    name: 'Aline e Klécio',
    username: 'aline.klecio',
    alternateUsernames: ['aline', 'klecio', 'noivos', 'admin'],
    role: 'noivos',
    members: ['Aline', 'Klécio'],
    customMessage: 'Bem-vindos ao espaço dos noivos! Aqui vocês podem publicar novos comunicados no mural, gerenciar os recados dos padrinhos e editar o cronograma oficial do grande dia.'
  },
  {
    id: 'debora-carlos',
    name: 'Débora e Carlos',
    username: 'debora.carlos',
    alternateUsernames: ['debora', 'carlos'],
    role: 'casal',
    members: ['Débora', 'Carlos'],
    pajem: 'Heitor',
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'graci-junior',
    name: 'Graci e Junior',
    username: 'graci.junior',
    alternateUsernames: ['graci', 'junior'],
    role: 'casal',
    members: ['Graci', 'Junior'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'luciene-kassio',
    name: 'Luciene e Kássio',
    username: 'luciene.kassio',
    alternateUsernames: ['luciene', 'kassio'],
    role: 'casal',
    members: ['Luciene', 'Kássio'],
    daminha: 'Luna',
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'marina-ayrton',
    name: 'Marina e Ayrton',
    username: 'marina.ayrton',
    alternateUsernames: ['marina', 'ayrton'],
    role: 'casal',
    members: ['Marina', 'Ayrton'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'stephany-junior',
    name: 'Stephany e Júnior',
    username: 'stephany.junior',
    alternateUsernames: ['stephany', 'junior2'],
    role: 'casal',
    members: ['Stephany', 'Júnior'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'thalita-thiago',
    name: 'Thalita e Thiago',
    username: 'thalita.thiago',
    alternateUsernames: ['thalita', 'thiago'],
    role: 'casal',
    members: ['Thalita', 'Thiago'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'ilka-rodrigo',
    name: 'Ilka e Rodrigo',
    username: 'ilka.rodrigo',
    alternateUsernames: ['ilka', 'rodrigo'],
    role: 'casal',
    members: ['Ilka', 'Rodrigo'],
    daminha: 'Julia',
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'aline-rodrigo',
    name: 'Aline e Rodrigo',
    username: 'aline.rodrigo',
    alternateUsernames: ['alinenoiva', 'rodrigo2'],
    role: 'casal',
    members: ['Aline', 'Rodrigo'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'iris-mauri',
    name: 'Iris e Mauri',
    username: 'iris.mauri',
    alternateUsernames: ['iris', 'mauri'],
    role: 'casal',
    members: ['Iris', 'Mauri'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'luciana-geisse',
    name: 'Luciana e Geisse',
    username: 'luciana.geisse',
    alternateUsernames: ['luciana', 'geisse'],
    role: 'casal',
    members: ['Luciana', 'Geisse'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'tialulu-pedrovictor',
    name: 'Tia Lulu e Pedro Victor',
    username: 'tialulu.pedrovictor',
    alternateUsernames: ['tialulu', 'pedrovictor', 'lulu'],
    role: 'casal',
    members: ['Tia Lulu', 'Pedro Victor'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'cleber',
    name: 'Cleber',
    username: 'cleber',
    role: 'padrinho',
    members: ['Cleber'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'camylla-cristiano',
    name: 'Camylla e Cristiano',
    username: 'camylla.cristiano',
    alternateUsernames: ['camylla', 'cristiano'],
    role: 'casal',
    members: ['Camylla', 'Cristiano'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'elaine',
    name: 'Elaine',
    username: 'elaine',
    role: 'madrinha',
    members: ['Elaine'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'simone-bruno',
    name: 'Tia Simone',
    username: 'simone.bruno',
    alternateUsernames: ['simone', 'tiasimone', 'simonebruno'],
    role: 'demoiselle',
    members: ['Tia Simone'],
    customMessage: `Aceita viver conosco essa missão tão especial?

No dia 09 de janeiro de 2027, queremos confiar à senhora uma missão repleta de amor, fé e significado: conduzir a imagem de Nossa Senhora da Conceição até o altar, representando a nossa devoção e as bênçãos que pedimos para a toda a família.

Que alegria poder viver todas as etapas que antecedem o nosso grande dia ao seu lado! Sempre presente em todos os momentos, cuidando de cada detalhe e, claro, com aquele olhar peculiar, atento e bem exigente que já conhecemos! 😂

Para Aline Bruno, a senhora é tia-mãe: aquela que cuida, aconselha, puxa as orelhas quando é preciso e está sempre lado a lado. A senhora cultivou no meu coração memórias afetivas que nunca serão esquecidas! Me lembro bem da dedicação nos preparativos para os meus aniversários, na confecção das sacolinhas, lembranças e etc; a confeiteira oficial da família Bruno, você arrasa no seu pudim!!! Esperamos 3 unidades deles no casamento 🤭; a mais brava, criteriosa e perfeccionista (não posso negar 😂) mas que demonstra seu amor justamente no cuidado e na dedicação com todos nós.

É Tia Simone, são tantas histórias e lembranças construídas ao longo desses anos que seria impossível imaginar um momento tão importante sem a sua presença.

Por tudo o que a senhora representa, não poderíamos deixar de lhe confiar uma participação tão significativa em nosso casamento.

Amamos você! Obrigada por ser intensidade, amor e carinho nas nossas vidas ❤️

Com amor e carinho 
Aline e Klécio`
  }
];

export const INITIAL_ANNOUNCEMENTS: PadrinhoMessage[] = [];

export const DRESS_CODE_INFO = {
  madrinhas: {
    title: 'Para as Madrinhas',
    description: 'Queremos que vocês estejam lindas, refletindo a personalidade e a essência de cada uma.',
    rules: [
      'Paleta de cores é inteiramente LIVRE, escolha a cor e o estilo que mais combinem com você.',
      'Optem por vestidos LONGOS e elegantes, harmonizando com a proposta clássica da celebração.',
      'Atenção: Cores Brancas, Off-White e Champanhe NÃO serão permitidas.'
    ],
    prohibitedColors: ['#FFFFFF', '#F5F5DC', '#FAF0E6', '#FFFDD0']
  },
  padrinhos: {
    title: 'Para os Padrinhos',
    description: 'Queremos que vocês estejam elegantes, pensando na proposta clássica da nossa cerimônia, escolhemos um traje que mantenha a harmonia e a sofisticação desse momento.',
    rules: [
      'Terno: Preto completo clássico (Paletó e Calça pretos).',
      'Gravata: Prata clássica.',
      'Sapato: Social preto.',
      'Camisa: Social branca tradicional de manga longa.'
    ]
  },
  daminhas: {
    title: 'Para as Daminhas e Pajens',
    description: 'Nossas daminhas e pajens estarão radiantes encabeçando o início do nosso sonho!',
    rules: [
      'Pajens: Traje social infantil em Azul Marinho ou Preto.',
      'Daminhas: Vestido infantil clássico (tons claros / off-white com detalhes delicados).',
      'Calçado confortável para caminhada graciosa até o altar.'
    ]
  }
};
