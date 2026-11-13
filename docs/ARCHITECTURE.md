# Arquitetura e Decisões Técnicas (Pilaris BPO)

Este documento define as fronteiras arquiteturais do projeto. Agentes de IA devem ler este arquivo antes de criar ou refatorar componentes, rotas ou lógicas de interação.

## 1. Stack Principal
- **Framework Core:** Astro v7 (SSG - Static Site Generation)
- **Engine de Estilização:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Framework de Interatividade (Ilhas):** React v19
- **Animações Complexas:** GSAP v3
- **Gerenciador de Pacotes:** `pnpm` (NUNCA use npm ou yarn)

## 2. A Regra de Ouro: Astro Estático vs. Ilhas React
Este é um site focado em performance extrema. O HTML de todas as páginas é gerado no build. O React entra **apenas** em blocos pontuais que exigem estado complexo ou animações avançadas.

- ✅ **Padrão (Sempre use Astro):** Cabeçalhos, rodapés, seções de texto, grids de serviços, banners, links e layouts. Crie componentes `.astro`.
- ⚡ **Exceção (Use React `.tsx` OBRIGATORIAMENTE com diretiva client, ex: `client:load` ou `client:visible`):** 
  - Animações complexas de rolagem e entrada coordenados com **GSAP** (ex: `HeroHome.tsx`, `PeoReasonForChooseUs.tsx`, `PeoLatestProjects.tsx`).
  - Carrosséis interativos (ex: `PeoTestimonials.tsx`).
  - Componentes com estado complexo de usuário (ex: `DiagnosticQuiz.tsx`).

## 3. Vanilla JS vs React (Interações Simples)
**NUNCA** crie uma ilha React para interações básicas de UI. 
- O Menu Mobile, a mudança de estado do Header ao rolar, a abertura da Janela Modal de vídeo e a confirmação de formulários utilizam **Vanilla JS**. *(Os modais de detalhe de serviço dos cards de soluções foram removidos; o rodapé "Ver solução detalhada" também.)*
- O menu de navegação (desktop e mobile) é **único e centralizado** em `src/data/navigation.ts` (consumido por `Header.astro` e `MobileMenu.astro`). O item atual é: **Home**, Nossas Soluções, **Sobre**, **Blog** e Contato. **Nunca crie um segundo menu** — adicione itens apenas em `navigation.ts`.
- Esses scripts globais vivem em `src/scripts/` (ex: `local-form.ts`, `modal.ts`) e são injetados diretamente nos componentes `.astro` via tag `<script>`.

## 4. Estrutura de Diretórios (`src/`)
Respeite o encapsulamento das pastas ao criar novos arquivos:
- `pages/`: Cada arquivo `.astro` representa uma rota. O `index.astro` é a home. Subpastas como `blog/` geram rotas dinâmicas (`[slug].astro`).
- `components/common/`: Elementos globais (Header, Footer, SEO, Breadcrumb, Botão WhatsApp).
- `components/home/`: Blocos exclusivos da página inicial e da página de diagnóstico.
- `components/peo/`: Seções reutilizáveis do site (Botões genéricos, faixas, depoimentos). **A seção "Em qual momento está a sua empresa?" (`PeoPricingPlans`) foi removida do site.**
- `components/modals/`: Estruturas `.astro` para janelas modais (gerenciadas pelo script `modal.ts`).
- `layouts/`: `BaseLayout.astro` (layout base global) e `BlogLayout.astro` (para artigos).
- `data/`: O "Banco de Dados" estático do site (`site.ts`, `navigation.ts`, `services.ts`, `blog.ts`). **Os componentes visuais devem consumir dados daqui, nunca ter texto chumbado**.

## 5. Roteamento e Build
- **Output:** O site é gerado usando `build: { format: 'file' }`. Isso significa uma página por arquivo HTML (ex: `/contato.html`). O servidor web cuida do mapeamento final.
- **Redirecionamentos:** Rotas antigas (`/sobre` -> `/conheca-a-pilaris`, `/servicos` -> `/nossas-solucoes`) são resolvidas no `astro.config.mjs` (para ambiente dev) e no `public/.htaccess` (para produção Apache).