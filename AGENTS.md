# Regras de Agente - Pilaris BPO Financeiro

## Contexto do Projeto
Site institucional estático construído com Astro, Tailwind CSS v4, e ilhas React para interatividade avançada (GSAP).
- **URL de Produção:** https://pilarisbpofinanceiro.com.br
- **Mote:** "Clareza, Controle, Crescimento."

## Regras Globais Estritas
- **Gerenciador de Pacotes:** Use EXCLUSIVAMENTE `pnpm` (fixado na v12.18.0). NUNCA use `npm` ou `yarn`.
- **React vs Astro:** Todo o site deve ser gerado como HTML estático (.astro). Use React **APENAS** para ilhas de interatividade complexa (como o `DiagnosticQuiz` ou animações do `GSAP`). Menus, modals e formulários simples devem usar Vanilla JS em `src/scripts/`.

## Roteamento de Contexto (Agentes de IA: Leiam antes de codar)
- 🎨 **Alterações de UI/Visual:** Leia `docs/DESIGN.md` para cores, tipografia (Urbanist) e regras anti-clichê.
- 🏗️ **Novos Componentes ou Rotas:** Leia `docs/ARCHITECTURE.md` para respeitar a divisão entre `src/components/common`, `peo`, e `home`.
- 📝 **Edição de Textos ou Blog:** Leia `docs/CONTENT.md`. NUNCA chumbe textos nos componentes; edite os arquivos em `src/data/`.

## Development (Comandos Locais)
When starting the dev server, use background mode:
```bash
astro dev --background