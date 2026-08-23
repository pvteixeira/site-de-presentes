export interface PadrinhoAccount {
  id: string;
  name: string;
  username: string;
  alternateUsernames?: string[];
  password: string;
  role: 'casal' | 'madrinha' | 'padrinho' | 'noivos';
  members: string[];
  customMessage?: string;
  daminha?: string;
  pajem?: string;
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
    password: 'Linocaeklecio2026',
    role: 'noivos',
    members: ['Aline', 'Klécio'],
    customMessage: 'Bem-vindos ao espaço dos noivos! Aqui vocês podem publicar novos comunicados no mural, gerenciar os recados dos padrinhos e editar o cronograma oficial do grande dia.'
  },
  {
    id: 'debora-carlos',
    name: 'Débora e Carlos',
    username: 'debora.carlos',
    alternateUsernames: ['debora', 'carlos'],
    password: '7492',
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
    password: '3815',
    role: 'casal',
    members: ['Graci', 'Junior'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'luciene-kassio',
    name: 'Luciene e Kássio',
    username: 'luciene.kassio',
    alternateUsernames: ['luciene', 'kassio'],
    password: '9204',
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
    password: '6531',
    role: 'casal',
    members: ['Marina', 'Ayrton'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'stephany-junior',
    name: 'Stephany e Júnior',
    username: 'stephany.junior',
    alternateUsernames: ['stephany', 'junior2'],
    password: '8173',
    role: 'casal',
    members: ['Stephany', 'Júnior'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'thalita-thiago',
    name: 'Thalita e Thiago',
    username: 'thalita.thiago',
    alternateUsernames: ['thalita', 'thiago'],
    password: '2940',
    role: 'casal',
    members: ['Thalita', 'Thiago'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'ilka-rodrigo',
    name: 'Ilka e Rodrigo',
    username: 'ilka.rodrigo',
    alternateUsernames: ['ilka', 'rodrigo'],
    password: '5162',
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
    password: '6489',
    role: 'casal',
    members: ['Aline', 'Rodrigo'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'iris-mauri',
    name: 'Iris e Mauri',
    username: 'iris.mauri',
    alternateUsernames: ['iris', 'mauri'],
    password: '1738',
    role: 'casal',
    members: ['Iris', 'Mauri'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'luciana-geisse',
    name: 'Luciana e Geisse',
    username: 'luciana.geisse',
    alternateUsernames: ['luciana', 'geisse'],
    password: '9524',
    role: 'casal',
    members: ['Luciana', 'Geisse'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'tialulu-pedrovictor',
    name: 'Tia Lulu e Pedro Victor',
    username: 'tialulu.pedrovictor',
    alternateUsernames: ['tialulu', 'pedrovictor', 'lulu'],
    password: '4389',
    role: 'casal',
    members: ['Tia Lulu', 'Pedro Victor'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'cleber',
    name: 'Cleber',
    username: 'cleber',
    password: '6047',
    role: 'padrinho',
    members: ['Cleber'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
  },
  {
    id: 'elaine',
    name: 'Elaine',
    username: 'elaine',
    password: '8253',
    role: 'madrinha',
    members: ['Elaine'],
    customMessage: 'No dia mais importante das nossas vidas, queremos estar cercados por aqueles que amamos e que fazem parte da nossa história. É uma alegria imensa poder dividir com vocês a nossa felicidade. E neste momento tão especial, não poderia ser diferente: desejamos ter vocês ao nosso lado, caminhando conosco, fortalecendo a nossa fé, compartilhando sonhos e construindo memórias inesquecíveis.'
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
    description: 'Os padrinhos deverão utilizar terno preto clássico com gravata prata, camisa branca e sapato preto, seguindo a proposta sofisticada e solene da celebração.',
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
