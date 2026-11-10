import 'server-only';

export interface PadrinhoAccountServer {
  id: string;
  name: string;
  username: string;
  alternateUsernames?: string[];
  password: string;
  role: 'casal' | 'madrinha' | 'padrinho' | 'noivos' | 'demoiselle' | 'pais';
  members: string[];
  customMessage?: string;
  daminha?: string;
  pajem?: string;
}

export const SERVER_PADRINHOS_ACCOUNTS: PadrinhoAccountServer[] = [
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
    id: 'camylla-cristiano',
    name: 'Camylla e Cristiano',
    username: 'camylla.cristiano',
    alternateUsernames: ['camylla', 'cristiano'],
    password: '5829',
    role: 'casal',
    members: ['Camylla', 'Cristiano'],
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
  },
  {
    id: 'simone-bruno',
    name: 'Tia Simone',
    username: 'simone.bruno',
    alternateUsernames: ['simone', 'tiasimone', 'simonebruno'],
    password: '3951',
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
  },
  {
    id: 'anapaula-abdias',
    name: 'Ana Paula e Abdias Silva',
    username: 'anapaula.abdias',
    alternateUsernames: ['anapaula', 'abdias', 'anapaulaeabdias', 'anapaula.silva', 'abdias.silva', 'paisdanoiva'],
    password: '2027',
    role: 'pais',
    members: ['Ana Paula', 'Abdias Silva'],
    customMessage: `Oi, Painho! Oi, Mainha!

Inicio esta mensagem com os olhos cheios de lágrimas e o coração transbordando de gratidão. É uma alegria incomensurável ter vocês na minha vida. ❤️ Deus foi misericordioso e bondoso comigo quando me escolheu para ser filha amada de vocês. E que privilégio! Para mim, vocês são sinônimos de orgulho, resistência, dedicação, amor, força e fé. Falar de vocês é uma tarefa difícil, porque me faltam palavras para descrever seres humanos tão extraordinários.

Ao longo dos meus 28 anos de vida, recebi e continuo recebendo o melhor que vocês podem me oferecer, sempre com muito amor, cuidado e carinho. As melhores escolas, os melhores professores, os melhores cursos, os melhores passeios, as melhores viagens, o melhor conforto… Tudo TOP! Mainha sempre fala: “ESSA MENINA TEM ESPÍRITO DE RICA!” E, afinal, eu sou rica mesmo! Sou rica de amor, de cuidado, de oportunidades, de experiências e, principalmente, por ter vocês como meus pais.

Sei que ainda não tenho condições de proporcionar a vocês tudo aquilo que merecem. Mas quero que saibam que estarei sempre aqui, para o que precisarem. E, se Deus permitir, ainda vou fazer esse jogo virar! 🙏🏼 Guardo comigo as lembranças de cada aniversário, de cada formatura, do catecismo, das lições de física, química e matemática, da construção de cada TCC e de tantas outras etapas da minha vida que vocês fizeram questão de acompanhar e tornar ainda mais especiais.

Hoje, acredito que estou chegando a uma das etapas mais desafiadoras da minha vida. Agora o negócio ficou sério! 🆘 Chegou o momento do tão sonhado CASAMENTO! Sinto uma alegria e uma felicidade nesse momento de organização e preparação, tudo sendo construído com muita dedicação e afeto. E, ainda assim, mesmo com toda essa preparação, confesso que meu coração está apertado. Sinto aquele frio na barriga ao imaginar como será viver essa nova fase, construir uma nova rotina e descobrir tudo aquilo que ainda está por vir. É uma mistura de felicidade, ansiedade, saudade antecipada e um pouquinho de medo do desconhecido — e coloque medo nisso kkkk!

Mais uma vez, sou grata a vocês por me proporcionarem uma festa tão especial. Acredito que será um momento mágico, cercado de amigos e familiares queridos, muitos dos quais acompanharam minha trajetória e torceram para que chegássemos até aqui. No meio de tantas emoções, quero pedir só uma coisinha: nunca me deixem sozinha! Estejam sempre por perto! Porque viver experiências ao lado de vocês sempre foi uma das maiores felicidades da minha vida.

Lembram do nosso passeio no Beto Carrero World? FOI MÁGICO! Que sonho realizado! Me senti vivendo meus 15 anos na própria Disney. Me diverti muito e ainda vi de perto a coragem de vocês nos brinquedos. 😂 Quero dizer também que a nossa grande família está ficando pequena a cada dia, com a partida de tantos entes queridos (Vovó Ubirajara (4010), Vovó Regina, Vovó Terezinha, Vovô Abdias, Tio Carlos Lacerda, Tio Neném, Tia Deda e Tio Carlinhos) 🥲. Reitero meu amor e admiração para aqueles que já não estão fisicamente entre nós. Continuarão sempre presentes na minha memória e no meu coração.

A vocês, quero agradecer por tudo que vivemos até aqui. Falta pouco! Vivam esse momento comigo! Dancem, sorriam, aproveitem, se emocionem e se permitam viver cada segundo desse momento tão especial para mim e Klécio. Porque essa festa também é de vocês e para vocês! Tudo aquilo que sou carrega um pouco de vocês e tudo aquilo que ainda vou construir levará comigo todos os ensinamentos.

AMO VOCÊS PARA SEMPRE! ❤️

“Honra a teu pai e a tua mãe, para que se prolonguem os teus dias na terra que o Senhor, teu Deus, te dá.”
Êxodo 20:12`
  }
];

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Linocaeklecio2026';
