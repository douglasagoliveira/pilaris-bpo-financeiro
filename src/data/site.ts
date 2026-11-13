export const site = {
  name: 'Pilaris BPO Financeiro',
  title: 'Pilaris BPO Financeiro | Gestão financeira estruturada para empresas em expansão',
  description:
    'BPO financeiro em Belo Horizonte, com atendimento nacional. Contas a pagar e a receber, conciliação, fluxo de caixa e relatórios para você decidir com segurança.',
  url: 'https://pilarisbpofinanceiro.com.br',
  defaultOgImage: '/og-default.jpg',
  whatsapp: 'https://wa.me/5531996304544?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20a%20Pilaris%20BPO%20Financeiro.',
  whatsappNumber: '5531996304544',
  whatsappRaw: '+55 31 99630-4544',
  email: 'contato@pilarisbpofinanceiro.com.br',
  city: 'Belo Horizonte, MG',
  coverage: 'Atendimento nacional',
  address: 'Belo Horizonte, MG — Atendimento nacional',
  hours: 'Segunda a Sexta, das 8h às 18h',
  founders: 'Leandro e Leandra Costa'
} as const;

/** WhatsApp link with a custom pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
