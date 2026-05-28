export interface PlayerCard {
  id: string;
  name: string;
  country: string;
  flag: string;
  role: string;
  imageUrl: string;
  badgeType: "Legend" | "Golden Hero" | "Super Star" | "Rookie" | "MasterClass";
  rarityColor: string;
}

export interface WrittenFeedback {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  tag: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const PLAYER_CARDS: PlayerCard[] = [
  {
    id: "messi",
    name: "Lionel Messi",
    country: "Argentina",
    flag: "🇦🇷",
    role: "Lenda Histórica",
    imageUrl: "https://i.ibb.co/hJTQ8KHy/messi.jpg",
    badgeType: "Legend",
    rarityColor: "from-amber-400 via-yellow-300 to-amber-600"
  },
  {
    id: "mbappe",
    name: "Kylian Mbappé",
    country: "França",
    flag: "🇫🇷",
    role: "Velocidade Pura",
    imageUrl: "https://i.ibb.co/vvZR2xnb/Chat-GPT-Image-28-de-mai-de-2026-00-05-53.png",
    badgeType: "Super Star",
    rarityColor: "from-blue-500 via-indigo-400 to-indigo-600"
  },
  {
    id: "yamal",
    name: "Lamine Yamal",
    country: "Espanha",
    flag: "🇪🇸",
    role: "Prodígio de Ouro",
    imageUrl: "https://i.ibb.co/hJr2Cdts/Chat-GPT-Image-28-de-mai-de-2026-00-10-03.png",
    badgeType: "Rookie",
    rarityColor: "from-rose-500 via-pink-400 to-orange-500"
  },
  {
    id: "paqueta",
    name: "Lucas Paquetá",
    country: "Brasil",
    flag: "🇧🇷",
    role: "Habilidade Pura",
    imageUrl: "https://i.ibb.co/svrdYsVG/Chat-GPT-Image-28-de-mai-de-2026-00-12-00.png",
    badgeType: "Golden Hero",
    rarityColor: "from-yellow-400 via-green-400 to-emerald-600"
  },
  {
    id: "bruno-fernandes",
    name: "Bruno Fernandes",
    country: "Portugal",
    flag: "🇵🇹",
    role: "Maestro do Meio",
    imageUrl: "https://i.ibb.co/TBVQ58v1/Chat-GPT-Image-28-de-mai-de-2026-00-17-08.png",
    badgeType: "MasterClass",
    rarityColor: "from-red-500 via-orange-400 to-red-700"
  },
  {
    id: "rafael-leao",
    name: "Rafael Leão",
    country: "Portugal",
    flag: "🇵🇹",
    role: "Drible Explosivo",
    imageUrl: "https://i.ibb.co/KpjXgN4c/Chat-GPT-Image-28-de-mai-de-2026-00-20-06.png",
    badgeType: "Super Star",
    rarityColor: "from-emerald-400 via-teal-300 to-emerald-600"
  },
  {
    id: "cucurella",
    name: "Marc Cucurella",
    country: "Espanha",
    flag: "🇪🇸",
    role: "Defesa implacável",
    imageUrl: "https://i.ibb.co/ZRfmdSy8/Chat-GPT-Image-28-de-mai-de-2026-00-22-43.png",
    badgeType: "Golden Hero",
    rarityColor: "from-amber-500 via-orange-400 to-yellow-500"
  },
  {
    id: "preciado",
    name: "Ángelo Preciado",
    country: "Equador",
    flag: "🇪🇨",
    role: "Força Lateral",
    imageUrl: "https://i.ibb.co/TxJmnD4j/Chat-GPT-Image-28-de-mai-de-2026-00-26-57.png",
    badgeType: "MasterClass",
    rarityColor: "from-yellow-500 via-blue-400 to-yellow-600"
  }
];

export const SCREENSHOT_FEEDBACKS = [
  {
    id: "feedback-1",
    url: "https://albumwordcup.lovable.app/assets/feedback-1-C3tOYKYs.png",
    alt: "WhatsApp depoimento sobre economia de R$ 120,00"
  },
  {
    id: "feedback-2",
    url: "https://albumwordcup.lovable.app/assets/feedback-2-Bh1tXGcj.png",
    alt: "WhatsApp depoimento sobre figurinhas sem repetição"
  },
  {
    id: "feedback-3",
    url: "https://albumwordcup.lovable.app/assets/feedback-3--7drdfiW.png",
    alt: "WhatsApp depoimento feliz com o completo impresso em casa"
  },
  {
    id: "feedback-4",
    url: "https://albumwordcup.lovable.app/assets/feedback-4-DOY26rtt.png",
    alt: "WhatsApp depoimento do avô que economizou muito para o neto"
  }
];

export const WRITTEN_FEEDBACKS: WrittenFeedback[] = [
  {
    id: "rev-1",
    name: "Tiago Mendes",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
    location: "Campinas - SP",
    rating: 5,
    date: "2 dias atrás",
    text: "Espetacular! A resolução de 300 DPI é de verdade, imprimi em papel fotográfico adesivo de 135g e ficou idêntico ao original. Meu filho completou no mesmo dia e eu economizei mais de R$ 350,00 que gastaria comprando envelopes repetidos no shopping. Recomendo de olhos fechados!",
    tag: "Compra Confirmada"
  },
  {
    id: "rev-2",
    name: "Mariana Souza",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
    location: "Belo Horizonte - MG",
    rating: 5,
    date: "Apenas hoje",
    text: "Eu estava cansada de comprar caixas de envelopes e virem sempre os mesmos jogadores. Resolvi dar uma chance para esse Pack Digital e foi a melhor decisão. Tudo separado por pastas dos países, já nas medidas perfeitas de 49mm x 65mm. O vendedor ainda envia atualizações grátis!",
    tag: "Acesso Vitalício"
  },
  {
    id: "rev-3",
    name: "Ronaldo Gouveia",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
    location: "Porto Alegre - RS",
    rating: 5,
    date: "3 dias atrás",
    text: "Levei o arquivo em PDF para uma gráfica rápida e gastei só R$ 12,00 para imprimir tudo folha adesiva brilhosa de excelente qualidade. Recortamos em família nos divertindo muito. Não existe custo-benefício melhor no Brasil.",
    tag: "Super Recomendado"
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Preciso de um tipo de impressora especial para imprimir as figurinhas?",
    answer: "Não! Qualquer impressora jato de tinta comum ou impressora laser funciona perfeitamente. Você também pode colocar os arquivos PDF em um pen drive ou enviá-los por e-mail para qualquer papelaria ou gráfica rápida da sua região. A impressão em folha adesiva fotográfica de alta qualidade em gráficas custa em média de R$ 1,50 a R$ 3,00 por folha."
  },
  {
    id: "faq-2",
    question: "Como e quando eu recebo os arquivos do Pack?",
    answer: "O acesso é imediato e 100% automático! Assim que o seu pagamento de apenas R$ 10,00 é confirmado (seja por PIX na hora ou Cartão de Crédito), você recebe instantaneamente um e-mail de confirmação com o link seguro de acesso ao painel de download. Lá você baixa todos os PDFs limpos, organizados e prontos."
  },
  {
    id: "faq-3",
    question: "As figurinhas vêm exatamente no tamanho oficial para colar no álbum?",
    answer: "Sim! Configurado milimetricamente no padrão oficial internacional das figurinhas de álbuns (49mm de largura por 65mm de altura). Você não precisa redimensionar nada, os arquivos já têm a sangria e linhas sutis de corte para que você possa cortar com régua ou tesoura perfeitamente e colar direto no álbum oficial!"
  },
  {
    id: "faq-4",
    question: "O que acontece se mudarem convocações ou lançarem novas figurinhas?",
    answer: "Você não paga absolutamente nenhum centavo a mais pelas novidades e correções! Nosso pack inclui atualização gratuita vitalícia para toda a Copa 2026. À medida que novas contratações, lesões ou alterações fiquem definidas nas convocações oficiais, nós atualizamos as pastas no servidor de downloads e você baixa a nova versão de graça."
  },
  {
    id: "faq-5",
    question: "Como funciona a garantia incondicional e condicional de 7 dias?",
    answer: "É extremamente simples e à prova de falhas: se em até 7 dias você olhar as figurinhas e achar que a qualidade da alta resolução (300 DPI) não é o que você queria, ou se simplesmente achar que não valeu a pena gastar os R$ 10,00, é só responder ao nosso e-mail ou mandar uma mensagem avisando. Devolvemos absolutamente todo o seu dinheiro de volta na hora, sem questionamentos burocráticos. O risco do teste é 100% nosso!"
  }
];
