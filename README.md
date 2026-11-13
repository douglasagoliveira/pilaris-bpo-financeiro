# Pilaris BPO Financeiro — site institucional

Site estático construído com [Astro](https://astro.build). O HTML de todas as páginas é gerado
no build; o React entra apenas em blocos pontuais que precisam de interação (ilhas).

- Produção: `https://pilarisbpofinanceiro.com.br`
- Gerenciador de pacotes: **pnpm** (não use npm nem yarn neste projeto)

## Requisitos

| Ferramenta | Versão |
|---|---|
| Node.js | 22.23.4 ou superior (LTS 22 ou 24) |
| pnpm | 12.x (o projeto fixa `pnpm@12.18.0` em `package.json`) |

Instalar o pnpm, se ainda não existir na máquina (uma das duas opções):

```bash
corepack enable            # já vem com o Node 22 e 24
npm install -g pnpm@12     # alternativa
```

## Comandos

```bash
pnpm install     # instala as dependências
pnpm dev         # servidor de desenvolvimento em http://localhost:4321
pnpm build       # gera o site em dist/
pnpm preview     # serve o conteúdo de dist/ para conferência
pnpm check       # verificação de tipos (Astro + TypeScript)
```

## Estrutura

```text
public/                  arquivos copiados como estão para a raiz do site
  .htaccess              regras do Apache (endereços, redirecionamentos, cache)
  robots.txt
  og-default.jpg         imagem de compartilhamento (1200×630)
  brand/                 logotipos e elementos gráficos (SVG)
  images/                fotos
src/
  assets/fonts/          fontes servidas pelo próprio site (Public Sans, DM Mono)
  components/
    common/              cabeçalho, menu, SEO, breadcrumb, campo de formulário, WhatsApp flutuante
    home/                blocos da página inicial e do diagnóstico
    modals/              janelas de vídeo
    peo/                 seções do site (botão, rodapé, faixas, depoimentos…)
  data/                  conteúdo editável: site.ts, navigation.ts, services.ts, blog.ts
  layouts/               BaseLayout.astro (todas as páginas) e BlogLayout.astro (artigos)
  lib/                   schema.ts (dados estruturados), paths.ts, types.ts
  pages/                 uma rota por arquivo
  scripts/               local-form.ts (formulários) e modal.ts (janelas)
  styles/global.css      Tailwind CSS 4 + estilos globais
astro.config.mjs         endereço do site, fontes, redirecionamentos, integrações
```

### Rotas

| Endereço | Arquivo |
|---|---|
| `/` | `src/pages/index.astro` |
| `/conheca-a-pilaris` | `src/pages/conheca-a-pilaris.astro` |
| `/nossas-solucoes` | `src/pages/nossas-solucoes.astro` |
| `/diagnostico` | `src/pages/diagnostico.astro` |
| `/contato` | `src/pages/contato.astro` |
| `/blog` | `src/pages/blog/index.astro` |
| `/blog/<slug>` | `src/pages/blog/[slug].astro` (um artigo por item de `src/data/blog.ts`) |
| `/rss.xml` | `src/pages/rss.xml.ts` |
| página de erro 404 | `src/pages/404.astro` |
| `/sobre` → `/conheca-a-pilaris` | redirecionamento (`astro.config.mjs` e `.htaccess`) |
| `/servicos` → `/nossas-solucoes` | redirecionamento (`astro.config.mjs` e `.htaccess`) |

## Onde editar o conteúdo

| O que | Onde |
|---|---|
| WhatsApp, e-mail, endereço, horário, título e descrição padrão | `src/data/site.ts` |
| Itens do menu | `src/data/navigation.ts` |
| Serviços exibidos no detalhe das soluções | `src/data/services.ts` |
| Artigos do blog | `src/data/blog.ts` |
| Título e descrição de cada página | início do arquivo da página em `src/pages/` |
| Textos das seções | o componente da seção em `src/components/` |

### Publicar um artigo

Acrescente um item em `src/data/blog.ts` com `slug`, `title`, `description`, `date`
(`AAAA-MM-DD`), `category`, `readTime`, `takeaways` e `content` (um texto por parágrafo).
A página do artigo, a listagem, o filtro por categoria, o sitemap e o RSS são atualizados no
próximo build.

## Ilhas React

Somente estes componentes carregam React no navegador. Eles aparecem em duas páginas:
a inicial e a de diagnóstico.

| Componente | Página | Motivo |
|---|---|---|
| `home/HeroHome.tsx` | inicial | animações de entrada do topo (GSAP) |
| `peo/PeoReasonForChooseUs.tsx` | inicial | leque de cartões animado pela rolagem (GSAP) e cartão ativo |
| `peo/PeoExploreServices.tsx` | inicial | grade de cartões de solução com destaque fixo no primeiro cartão |
| `peo/PeoLatestProjects.tsx` | inicial | painéis fixados e empilhados durante a rolagem (GSAP) |
| `peo/PeoTestimonials.tsx` | inicial | carrossel de depoimentos |
| `home/DiagnosticQuiz.tsx` | diagnóstico | questionário com pontuação e resultado |

Todo o restante é Astro e chega ao navegador como HTML pronto. As interações simples usam
scripts pequenos, sem React:

| Interação | Onde está |
|---|---|
| Menu em telas pequenas, cabeçalho que muda ao rolar | `common/Header.astro` + `common/MobileMenu.astro` |
| Janelas de vídeo | `src/scripts/modal.ts` (usado por `modals/*.astro`) |
| Confirmação dos formulários | `src/scripts/local-form.ts` |
| Filtro de categorias do blog | `pages/blog/index.astro` |
| Botão de compartilhar do artigo | `layouts/BlogLayout.astro` |
| Barra de progresso de rolagem, dica do WhatsApp | `common/ScrollProgress.astro`, `common/FloatingWhatsApp.astro` |
| Perguntas frequentes e "Como trabalhamos" | elemento nativo `<details>`, sem script |

## SEO

- `src/components/common/SEO.astro` gera título, descrição, canonical, Open Graph, Twitter Card
  e os dados estruturados (JSON-LD) de cada página.
- `src/lib/schema.ts` contém os modelos de dados estruturados (empresa, breadcrumb, FAQ,
  serviços, artigos).
- `sitemap-index.xml` e `rss.xml` são gerados no build; `public/robots.txt` aponta para o sitemap.
- O endereço do site fica em dois lugares que devem ser iguais: `site` em `astro.config.mjs`
  e `url` em `src/data/site.ts`.

## Formulários

Os formulários (contato, soluções e newsletter) ainda não enviam dados para nenhum serviço:
ao enviar, exibem a confirmação na própria página. O comportamento está em
`src/scripts/local-form.ts`, que indica o ponto onde conectar um serviço de e-mail, CRM ou API.

## Publicação em Apache / cPanel

1. Rode `pnpm build`.
2. Envie **todo o conteúdo** da pasta `dist/` para a pasta pública do domínio (`public_html`).
   O arquivo `.htaccess` começa com ponto e fica oculto em alguns programas: ative a exibição
   de arquivos ocultos para confirmar que ele foi enviado.
3. Abra o site e confira `/contato`, `/blog` e `/sobre` (este último deve levar a
   `/conheca-a-pilaris`).

O que o `.htaccess` faz:

- serve cada página no endereço sem extensão (`/contato` entrega `contato.html`);
- redireciona com código 301 os endereços antigos `/sobre` e `/servicos`, endereços com barra
  final e endereços terminados em `.html`;
- usa a página 404 do próprio site;
- aplica compressão e cache (um ano para os arquivos de `/_astro/`, que mudam de nome a cada
  alteração).

Requer `mod_rewrite`, que é padrão no cPanel.

**HTTPS e domínio único:** o bloco que força `https://` e remove o `www` está no `.htaccess`,
desativado. Ative-o somente depois de confirmar que o certificado SSL do domínio está válido.
Se o domínio usar um serviço intermediário como o Cloudflare, configure esse redirecionamento
no próprio serviço, não no `.htaccess`.

## Fontes

Public Sans e DM Mono são servidas pelo próprio site a partir de `src/assets/fonts/`
(licença SIL Open Font License 1.1, detalhes em `src/assets/fonts/LEIA-ME.md`).
Nenhuma requisição é feita ao Google Fonts.
