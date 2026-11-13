# Design System e Regras Visuais (Pilaris BPO)

Este documento dita as regras estéticas do projeto com base no Manual de Marca de 2026. Agentes de IA devem seguir estas diretrizes rigorosamente para não descaracterizar a interface.

## 1. Cores da Marca (Paleta Principal)
Sempre utilize as cores exatas em HEX nas classes utilitárias do Tailwind CSS. 
- **Azul Escuro (Fundo principal escuro / Textos fortes):** `#021A39`
- **Azul Claro (Destaques, CTAs, Elementos primários):** `#055ED3`
- **Azul Suave (Apoios visuais secundários):** `#99B7FC`
- **Azul Pálido (Fundos suaves / Cards):** `#E9EBFF`
- **Branco Pilaris (Fundo Base do site):** `#FAFDFD`

## 2. Cores Complementares (Dashboards e Gráficos)
Estas cores devem ser usadas **exclusivamente** como apoio para compor gráficos, relatórios, badges de status ou dashboards. **Não** as utilize na estrutura principal de navegação do site.
- **Verde:** `#00B5AD`
- **Laranja:** `#F7931D`
- **Vermelho:** `#EF232A`

## 3. Tipografia
- **Tipografia Institucional da Marca:** `Urbanist` (Pesos: Light, Regular, Bold). É a base do manual para peças gráficas.
- **Fontes Implementadas no Código:** O arquivo `astro.config.mjs` atualmente carrega localmente as fontes **Public Sans** (`--font-public-sans`) e **DM Mono** (`--font-dm-mono`). 
*(Nota para o Agente de IA: Ao criar componentes HTML, respeite as variáveis CSS já mapeadas no Tailwind baseadas nas fontes carregadas em `src/assets/fonts/`).*

## 4. Regras do Logotipo (Anti-Slop)
Se houver manipulação de imagens ou posicionamento da logo via CSS/SVG, siga **estritamente** as regras abaixo. **A quebra dessas regras fere a identidade visual:**
- **Área de Respiro:** O respiro ao redor da logo deve ser sempre igual a "X", onde "X" é a largura total do logotipo.
- 🚫 **NUNCA** aplique sombras (drop-shadow).
- 🚫 **NUNCA** estique, achate ou rotacione o logotipo.
- 🚫 **NUNCA** aplique o logotipo colorido sobre fundos com cores que não combinam (conflito de paleta). Se o fundo for complexo ou conflitante, use OBRIGATORIAMENTE a versão monocromática (toda branca ou toda preta).

## 5. Tom de Voz e Copywriting Base
O site deve passar credibilidade, organização financeira e previsibilidade corporativa. Não invente jargões genéricos.
- **Mote principal:** "Clareza, Controle, Crescimento."
- **Promessa de Valor (Hero Copy):** "Transforme a gestão financeira da sua empresa em um processo organizado, previsível e confiável."
- **Palavras-chave de Soluções:** Emissão de Notas, Redução de Custos, Emissão de Boletos, Controle Financeiro, Gestão do Fluxo de Caixa.

## 6. Estilo de Interface (Direção de Arte)
- O visual do Pilaris BPO é editorial corporativo, "clean" e tipográfico.
- Utilize layouts assimétricos, grids limpos e **patterns discretos** (elementos geométricos de apoio da marca).
- **Sem Gradientes Genéricos:** As cores do site são majoritariamente sólidas, focando no alto contraste entre o Branco Pilaris e o Azul Escuro, com toques de Azul Claro.