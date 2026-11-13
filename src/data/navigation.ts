export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const navigation: NavItem[] = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Nossas Soluções',
    href: '/nossas-solucoes'
  },
  {
    label: 'Sobre',
    href: '/conheca-a-pilaris'
  },
  {
    label: 'Blog',
    href: '/blog'
  },
  {
    label: 'Contato',
    href: '/contato'
  }
];
