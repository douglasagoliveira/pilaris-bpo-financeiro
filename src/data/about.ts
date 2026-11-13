/**
 * Texts of the page "Conheça a Pilaris" (/conheca-a-pilaris).
 *
 * Source: the copy "Conheça a Pilaris" (brand archetype: Ajudador). The tone of voice rules and
 * the points that still depend on the client's validation are in docs/CONTENT.md.
 * The components in src/components/about/ only display what is written here: to change a text,
 * edit this file.
 */

/** Section title: `text` in the title colour, `accent` (the rest of the sentence) in the highlight colour. */
export interface AboutHeading {
  text: string;
  accent?: string;
}

export interface AboutLink {
  label: string;
  href: string;
}

export interface AboutVideo {
  /** Embed address of the video (the player is only requested when the dialog opens). */
  url: string;
  trigger: string;
  eyebrow: string;
  heading: string;
  iframeTitle: string;
}

export interface AboutIntroContent {
  eyebrow: string;
  title: AboutHeading;
  paragraphs: string[];
  image: { src: string; alt: string };
  /** Decorative tags over the photo. They repeat what the first paragraph already says. */
  loose: string[];
}

export interface AboutStat {
  label: string;
  /** The animated number, with the text shown before and after it. */
  value: number;
  prefix?: string;
  suffix: string;
  text: string;
}

export interface AboutStatement {
  label: string;
  text: string;
}

export interface AboutValue {
  name: string;
  text: string;
}

export interface AboutPurposeContent {
  eyebrow: string;
  title: AboutHeading;
  subtitle: string;
  mission: AboutStatement;
  vision: AboutStatement;
  values: { label: string; lead: string; items: AboutValue[] };
}

export interface AboutFront {
  /** Selects the icon of the front in `AboutCare.tsx`. */
  key: "execution" | "relationship";
  name: string;
  text: string;
}

export interface AboutCareContent {
  eyebrow: string;
  title: AboutHeading;
  subtitle: string;
  fronts: AboutFront[];
}

export interface AboutFaqItem {
  question: string;
  answer: string;
}

export interface AboutContent {
  /** Title and description of the page in search engines and link previews. */
  meta: { title: string; description: string };
  /** Name of the page in the breadcrumb of the structured data. */
  breadcrumb: string;
  /** Top of the page. The seal "Pilaris BPO · Clareza, Controle, Crescimento." belongs to the hero component. */
  hero: { title: string; description: string; image: string };
  /** Opening: why the company exists. `video: null` removes the presentation button from the photo. */
  intro: AboutIntroContent & { cta: AboutLink; video: AboutVideo | null };
  /** Number cards. `label` names the group for assistive technology. */
  stats: { label: string; items: AboutStat[] };
  /** Mission, vision and values: the centre of the page. */
  purpose: AboutPurposeContent & { cta: AboutLink };
  /** How the company takes care of the client: the two fronts. */
  care: AboutCareContent;
  /** Frequent questions. The same items feed the structured data (FAQPage). */
  faq: { eyebrow: string; title: AboutHeading; items: AboutFaqItem[] };
  /** Closing call of the page. */
  closing: { title: string; text: string; cta: AboutLink };
}

export const about: AboutContent = {
  meta: {
    title: "Conheça a Pilaris | BPO Financeiro para empresas em crescimento",
    description:
      "Conheça a Pilaris BPO: missão, visão e valores de quem cuida do financeiro da sua empresa com método, clareza e proximidade. Atendimento em todo o Brasil.",
  },

  breadcrumb: "Conheça a Pilaris",

  hero: {
    title: "Você cuida do seu negócio. A gente cuida da base financeira.",
    description:
      "Conheça o jeito Pilaris de cuidar do financeiro da sua empresa: com método, rotina e números claros, para você crescer com segurança e sem carregar tudo sozinho.",
    image: "/images/leandro-leandra-pilaris-bpo-financeiro.jpg",
  },

  intro: {
    eyebrow: "Por que existimos",
    title: {
      text: "Ninguém deveria carregar o financeiro da empresa",
      accent: "sozinho.",
    },
    paragraphs: [
      "Sabemos como é. Boletos para pagar, contas para receber, planilhas que não fecham e a sensação de que o caixa pode surpreender a qualquer momento. Quando o financeiro depende só de você, ele pesa.",
      "A Pilaris nasceu para dividir esse peso. Entramos na rotina da sua empresa, organizamos o que está solto e acompanhamos tudo de perto, para você decidir com tranquilidade e usar o seu tempo no que faz o negócio crescer.",
    ],
    image: {
      src: "/images/pilaris-bpo-office-detail.jpg",
      alt: "Duas pessoas analisam juntas relatórios financeiros impressos sobre a mesa do escritório",
    },
    loose: [
      "Boletos para pagar",
      "Contas para receber",
      "Planilhas que não fecham",
    ],
    cta: { label: "Conhecer nossas soluções", href: "/nossas-solucoes" },
    video: {
      url: "https://www.youtube-nocookie.com/embed/BHACKCNDMW8?autoplay=1",
      trigger: "Assistir apresentação",
      eyebrow: "Pilaris BPO Financeiro",
      heading: "Apresentação da Pilaris BPO",
      iframeTitle: "Vídeo de apresentação da Pilaris BPO",
    },
  },

  stats: {
    label: "A Pilaris em números",
    items: [
      {
        label: "Resposta inicial",
        value: 24,
        suffix: "h",
        text: "Em até 24 horas, um especialista já está olhando o seu cenário. Você não espera sozinho.",
      },
      {
        label: "Atendimento",
        value: 100,
        suffix: "%",
        text: "Cobertura nacional: de qualquer lugar do Brasil, com base em Belo Horizonte, MG.",
      },
      {
        label: "Experiência",
        prefix: "+",
        value: 18,
        suffix: " anos",
        text: "Mais de 18 anos de prática para o seu financeiro não virar aprendizado às suas custas.",
      },
      {
        label: "Atuação da equipe",
        value: 5,
        suffix: " dias",
        text: "Nossa equipe atua de segunda a sexta-feira: contas em dia, conciliações feitas e menos risco de atraso.",
      },
    ],
  },

  purpose: {
    eyebrow: "O que nos move",
    title: {
      text: "Delegar não é perder o controle.",
      accent: "É ganhar clareza e tranquilidade para decidir.",
    },
    subtitle:
      "Esses são os compromissos que guiam o nosso cuidado com a sua empresa.",
    mission: {
      label: "Missão",
      text: "Cuidar do financeiro das empresas com método e proximidade, para que seus donos tenham segurança para decidir e tempo para crescer.",
    },
    vision: {
      label: "Visão",
      text: "Ser a parceira em quem o empresário confia para cuidar da base financeira do negócio, em todo o Brasil.",
    },
    values: {
      label: "Valores",
      lead: "O que isso significa para você",
      items: [
        {
          name: "Clareza",
          text: "Números organizados e relatórios que você entende de primeira. Se tiver dúvida, a gente explica.",
        },
        {
          name: "Controle",
          text: "Cada conta, conciliação e prazo acompanhado de perto, para nada passar despercebido.",
        },
        {
          name: "Previsibilidade",
          text: "Um fluxo de caixa que mostra o que vem pela frente, para você se preparar antes do problema chegar.",
        },
        {
          name: "Confiança",
          text: "Informações tratadas com cuidado e entrega consistente. Você delega sabendo que está em boas mãos.",
        },
      ],
    },
    cta: { label: "Falar com a Pilaris", href: "/contato" },
  },

  care: {
    eyebrow: "Como cuidamos de você",
    title: {
      text: "Duas frentes,",
      accent: "um só cuidado com o seu financeiro.",
    },
    subtitle:
      "Rigor técnico e atendimento próximo trabalhando juntos, para você ter processos organizados e alguém que escuta.",
    fronts: [
      {
        key: "execution",
        name: "Execução e estruturação",
        text: "Processos financeiros, planilhas e conciliações organizados com método, para nada ficar para depois.",
      },
      {
        key: "relationship",
        name: "Relacionamento e implantação",
        text: "Conversa direta com você e implantação cuidadosa das rotinas, para a transição ser simples e sem ruído.",
      },
    ],
  },

  faq: {
    eyebrow: "Dúvidas comuns",
    title: {
      text: "Perguntas que costumam aparecer",
      accent: "antes de começar",
    },
    items: [
      {
        question: "O que a Pilaris BPO faz?",
        answer:
          "Cuidamos da rotina financeira da sua empresa: contas a pagar e a receber, conciliações diárias, boletos, emissão de notas fiscais, fluxo de caixa e relatórios gerenciais. Você recebe tudo organizado e fica com o que importa: a decisão.",
      },
      {
        question: "A Pilaris atende empresas de qualquer lugar do Brasil?",
        answer:
          "Atende. Nosso atendimento é 100% nacional, a partir de Belo Horizonte, MG. Rotina, relatórios e conversas funcionam à distância, sem perder a proximidade.",
      },
      {
        question:
          "A Pilaris trabalha junto com a contabilidade da minha empresa?",
        answer:
          "Trabalha. Cuidamos da rotina financeira e deixamos as informações organizadas para o seu contador, o que costuma reduzir retrabalho e atrasos no fechamento.",
      },
      {
        question: "Delegar o financeiro significa perder o controle?",
        answer:
          "Ao contrário. Hoje o controle pode depender de você lembrar de tudo. Com a Pilaris, ele passa a depender de processo: rotina definida, relatórios claros e acompanhamento constante. Você continua no comando, com mais apoio.",
      },
      {
        question: "Como começo?",
        answer:
          "É simples. Fale com a Pilaris e responderemos em até 24 horas. Vamos entender o seu cenário, apresentar um diagnóstico operacional e mostrar, passo a passo, por onde começar.",
      },
    ],
  },

  closing: {
    title: "Vamos olhar o seu financeiro juntos?",
    text: "Faça uma avaliação online do perfil de Maturidade Financeira e Fiscal da sua empresa. É 100% gratuito.",
    cta: { label: "Fazer avaliação gratuita", href: "/diagnostico" },
  },
};
