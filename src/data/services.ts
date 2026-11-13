export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  description: string;
  iconName: string;
  deliverables: string[];
  benefits: string[];
  kpi: string;
  idealFor: string;
}

export const services: ServiceItem[] = [
  {
    id: 'bpo-financeiro',
    number: '01',
    title: 'BPO Financeiro Completo',
    shortDescription: 'Assumimos a rotina financeira da sua empresa com processos claros, prazos organizados e acompanhamento contínuo.',
    description: 'Terceirização integral da operação financeira da sua empresa. Assumimos o contas a pagar, receber, conciliação e rotinas bancárias diárias com equipe sênior dedicada.',
    iconName: 'Building2',
    deliverables: [
      'Conciliação bancária diária de todas as contas',
      'Agendamento de lotes de pagamento no banco',
      'Acompanhamento e baixa de recebimentos em tempo real',
      'Gestão de documentos fiscais e comprovantes em nuvem',
      'Atendimento humanizado via canal exclusivo'
    ],
    benefits: [
      'Fim da sobrecarga dos sócios com rotinas bancárias',
      'Eliminação de erros de digitação e juros por atraso',
      'Operação financeira profissional com custo reduzido versus CLT interno'
    ],
    kpi: '-92% de tempo gasto em rotinas bancárias',
    idealFor: 'Empresas faturando de R$ 50 mil a R$ 5 milhões/mês'
  },
  {
    id: 'contas-a-pagar',
    number: '02',
    title: 'Contas a Pagar',
    shortDescription: 'Organização de vencimentos, pagamentos, compromissos financeiros e controle de saídas.',
    description: 'Controle rigoroso de todos os compromissos financeiros com fornecedores, folha, impostos e custos operacionais. Sem surpresas ou multas.',
    iconName: 'CreditCard',
    deliverables: [
      'Triagem e lançamento de boletos, tributos e contratos',
      'Agendamento no Internet Banking para aprovação com 1 clique',
      'Calendário semanal e mensal de desembolsos',
      'Auditoria de notas fiscais versus pedidos de compra',
      'Relatório de despesas por centro de custo'
    ],
    benefits: [
      'Zero juros e multas por esquecimento de vencimentos',
      'Aprovação segura: os sócios mantêm a alçada de autorização',
      'Clareza total sobre o peso das despesas fixas e variáveis'
    ],
    kpi: '100% de pagamentos agendados no prazo',
    idealFor: 'Negócios com múltiplos fornecedores e alto volume de boletos'
  },
  {
    id: 'contas-a-receber',
    number: '03',
    title: 'Contas a Receber',
    shortDescription: 'Acompanhamento de recebíveis, cobranças, boletos e previsibilidade de entrada de caixa.',
    description: 'Maximizamos a liquidez da sua empresa com emissão ágil de cobranças, conciliação de cartões e PIX, e régua automatizada e gentil de cobrança.',
    iconName: 'TrendingUp',
    deliverables: [
      'Emissão de boletos registrados e links de pagamento PIX/Cartão',
      'Régua preventiva de aviso de vencimento via e-mail e WhatsApp',
      'Conciliação de adquirentes e taxas de cartão de crédito',
      'Cobrança ativa e cordial de títulos em atraso',
      'Relatório de aging list (inadimplência por faixa de dias)'
    ],
    benefits: [
      'Redução drástica do índice de inadimplência',
      'Previsibilidade exata de quando o dinheiro entrará na conta',
      'Relacionamento com o cliente preservado com cobrança profissional'
    ],
    kpi: '-40% na taxa de inadimplência média',
    idealFor: 'Prestadores de serviço, agências, clínicas e comércio recorrente'
  },
  {
    id: 'emissao-de-notas',
    number: '04',
    title: 'Emissão de Notas e Gestão Fiscal',
    shortDescription: 'Suporte para emissão e organização de documentos fiscais da empresa.',
    description: 'Emissão ágil e correta de Notas Fiscais de Serviços (NFS-e), Produtos (NF-e) e envio estruturado dos arquivos XML/PDF para sua contabilidade.',
    iconName: 'Receipt',
    deliverables: [
      'Emissão de notas fiscais vinculadas aos contratos e vendas',
      'Validação de retenções de impostos (ISS, IRRF, PIS, COFINS, CSLL)',
      'Fechamento mensal e envio de pacote fiscal completo ao contador',
      'Armazenamento seguro de XMLs e comprovantes por 5 anos',
      'Acompanhamento de certidões negativas de débito (CNDs)'
    ],
    benefits: [
      'Conformidade fiscal impecável sem retrabalho contábil',
      'Agilidade no faturamento aos clientes',
      'Eliminação de retenções tributárias incorretas'
    ],
    kpi: 'Emissão em até 2 horas após aprovação da OS',
    idealFor: 'Empresas de serviços que perdem tempo no portal da prefeitura'
  },
  {
    id: 'fluxo-de-caixa',
    number: '05',
    title: 'Fluxo de Caixa & Projeção',
    shortDescription: 'Visualização clara das entradas, saídas e projeções financeiras para tomada de decisão.',
    description: 'Transformamos números brutos em visão estratégica diária, semanal e mensal para você saber exatamente quanto dinheiro terá daqui a 30, 60 e 90 dias.',
    iconName: 'LineChart',
    deliverables: [
      'Fluxo de caixa diário realizado versus orçado',
      'Projeção financeira preditiva para 30, 60 e 90 dias',
      'Análise de capital de giro e ponto de equilíbrio (breakeven)',
      'Identificação de gargalos sazonais de liquidez',
      'Recomendações táticas para preservação de caixa'
    ],
    benefits: [
      'Poder de antecipar momentos de aperto antes que aconteçam',
      'Segurança para planejar contratações, compras e expansões',
      'Fim da sensação angustiante de faturar muito e não ver o dinheiro'
    ],
    kpi: 'Visão futura de caixa com 95% de precisão',
    idealFor: 'Empresas em fase de escala ou com sazonalidade no caixa'
  },
  {
    id: 'relatorios-gerenciais',
    number: '06',
    title: 'Relatórios Gerenciais & DRE',
    shortDescription: 'Informações financeiras organizadas para decisões mais seguras e estratégicas.',
    description: 'Dashboards executivos, DRE Gerencial (Demonstrativo do Resultado do Exercício) e reuniões mensais de alinhamento com especialistas da Pilaris.',
    iconName: 'PieChart',
    deliverables: [
      'DRE Gerencial por Regime de Competência e Caixa',
      'Análise de margem de contribuição por produto ou serviço',
      'Relatório de lucratividade líquida e EBITDA gerencial',
      'Dashboard visual com gráficos interativos e indicadores',
      'Reunião mensal executiva de apresentação dos resultados'
    ],
    benefits: [
      'Diagnóstico real se a empresa está lucrando ou gerando prejuízo',
      'Dados concretos para reuniões de diretoria e sócios',
      'Clareza para precificar com inteligência e cortar desperdícios'
    ],
    kpi: 'Fechamento gerencial até o 5º dia útil do mês',
    idealFor: 'Empresários que querem transformar finanças em alavanca de crescimento'
  }
];
