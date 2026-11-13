# SEO e GEO (Search & Generative Engine Optimization)

Este documento define as regras de indexação e estruturação semântica do Pilaris BPO Financeiro. Agentes de IA devem seguir estas diretrizes ao criar ou modificar rotas, layouts e conteúdos para garantir máxima visibilidade orgânica.

## 1. Metadados e Open Graph (OG)
Nenhum metadado deve ser repetido ou "chumbado" estaticamente nas páginas sem flexibilidade.
- **Configuração Global:** O título base, a descrição padrão e o idioma do site devem vir de `src/data/site.ts`.
- **Injeção de Página:** Cada arquivo em `src/pages/` deve passar as propriedades `title` e `description` para o componente `<BaseLayout>`.
- **Imagem de Compartilhamento (OG Image):** O fallback padrão para compartilhamento em redes sociais e indexação gráfica é `/public/og-default.jpg` (dimensões 1200x630). Se uma página específica (como um post de blog) tiver uma imagem própria, ela deve sobrescrever o padrão.

## 2. Estrutura HTML Semântica (Acessibilidade e SEO)
Ao criar novos componentes, a IA deve respeitar rigidamente as marcações HTML5:
- **Hierarquia de Headings:** Apenas **UM** `<h1>` por página (geralmente no Hero). Os subtítulos devem seguir a ordem lógica (`<h2>`, `<h3>`), sem pular níveis (ex: nunca ir de um h2 direto para um h4).
- **Landmarks:** Utilize tags semânticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) em vez de genéricas `<div>` onde for apropriado.
- **Links e Imagens:** 
  - Todo `<a href="...">` deve ter texto âncora claro (evite "clique aqui").
  - Toda `<img>` deve possuir o atributo `alt` preenchido de forma descritiva.

## 3. SEO Técnico no Astro
- **URLs Canônicas e Trailing Slashes:** O projeto está configurado no `astro.config.mjs` com `trailingSlash: 'never'` e `build: { format: 'file' }`. O Apache (`public/.htaccess`) cuida do roteamento. Nunca force barras no final das URLs nos links internos.
- **Sitemap:** É gerado automaticamente pelo pacote `@astrojs/sitemap`. Não crie arquivos sitemap manualmente.
- **RSS Feed:** O blog gera automaticamente o feed em `/rss.xml` (via `src/pages/rss.xml.ts`) lendo os dados de `src/data/blog.ts`.
- **Robots:** Regras de rastreamento devem ser mantidas exclusivamente no arquivo `public/robots.txt`.

## 4. Dados Estruturados (Schema.org)
O Google precisa entender exatamente o que a Pilaris faz. Os scripts de dados estruturados em formato JSON-LD são gerenciados e exportados pelo arquivo **`src/lib/schema.ts`**.
- Sempre que criar uma nova estrutura de serviço, garanta que ela reflita no schema de `LocalBusiness` ou `FinancialService`.
- Posts do blog devem acionar automaticamente o schema de `Article` ou `BlogPosting`.

## 5. GEO (Generative Engine Optimization) - Otimização para IAs
Para que a Pilaris seja bem recomendada por motores de busca baseados em IA (ChatGPT, Gemini, Perplexity):
- Mantenha a clareza informacional. O texto nas seções do site deve ser direto (bullet points, parágrafos curtos) e rico em entidades (ex: citar explicitamente "terceirização financeira", "emissão de notas fiscais B2B").
- **Arquivo `llms.txt`:** No futuro, caso seja implementado em `/public/llms.txt`, mantenha lá um resumo Markdown com os fatos centrais da Pilaris BPO para que bots de IA absorvam rapidamente o perfil da empresa sem precisar rastrear todo o HTML.