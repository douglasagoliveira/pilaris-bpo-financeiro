# PRD (Product Requirements Document) - Pilaris BPO Financeiro

## 1. Visão Geral do Produto
O Pilaris BPO Financeiro é um site institucional premium focado na conversão de clientes corporativos (B2B) que buscam assessoria financeira e fiscal. O objetivo principal do site é transmitir autoridade, organizar as ofertas de serviço e capturar leads qualificados através de um funil interativo (Diagnóstico) e chamadas diretas (WhatsApp/Formulário).

## 2. Público-Alvo e Promessa de Valor
- **Público:** Empreendedores, diretores e gestores de empresas que sofrem com desorganização financeira e precisam terceirizar a gestão do seu fluxo de caixa, emissão de notas/boletos e redução de custos.
- **Promessa (Mote):** "Clareza, Controle, Crescimento."
- **Objetivo da Conversão:** Fazer com que o usuário agende uma reunião ou preencha o diagnóstico para receber uma proposta personalizada.

## 3. Mapa do Site e Estrutura de Páginas
O escopo funcional contempla as seguintes rotas principais:

| Rota | Objetivo e Funcionalidade |
|---|---|
| `/` | **Home:** Apresentar a promessa de valor (Hero com GSAP), listar diferenciais, exibir prévia de soluções, mostrar depoimentos (Carrossel React) e projetos recentes. |
| `/conheca-a-pilaris` | **Sobre a Empresa:** Construção de autoridade, apresentação da equipe/história e consolidação da marca. *(Redireciona requests legados de `/sobre`)*. |
| `/nossas-solucoes` | **Serviços Detalhados:** Apresentação aprofundada de (1) Emissão de Notas, (2) Redução de Custos, (3) Emissão de Boletos, (4) Controle Financeiro, (5) Gestão do Fluxo de Caixa. *(Redireciona requests legados de `/servicos`)*. |
| `/diagnostico` | **Captura Interativa:** Um quiz/questionário (Ilha React) que avalia a saúde financeira da empresa do visitante e gera um resultado ou pontuação, atuando como um ímã de leads. |
| `/contato` | **Fale Conosco:** Formulário de contato validado localmente e informações diretas (telefone, e-mail, endereço). |
| `/blog` e `/blog/[slug]`| **Marketing de Conteúdo (SEO):** Listagem e leitura de artigos consumidos estaticamente de `src/data/blog.ts`, com suporte a feed RSS e sitemap automatizado. **Acessível pelo item "Blog" do menu principal.** |

O menu principal (desktop e mobile) é centralizado em `src/data/navigation.ts` e contém: **Home, Nossas Soluções, Sobre, Blog e Contato**. Novos itens de menu devem ser adicionados apenas nesse arquivo.

## 4. Principais Fluxos de Usuário (User Flows)
1. **O Fluxo do Diagnóstico (Lead Quente):** O usuário entra na Home > clica no CTA principal > é direcionado para `/diagnostico` > responde a uma série de perguntas no componente `DiagnosticQuiz.tsx` > recebe uma avaliação > é incentivado a contatar os especialistas.
2. **O Fluxo de Descoberta (SEO):** O usuário encontra um artigo via Google > acessa `/blog/[slug]` > lê o conteúdo > acessa as soluções no menu > usa o botão flutuante do WhatsApp (gerenciado no `BaseLayout`) para tirar dúvidas.

## 5. Critérios de Aceite (Regras de Produto para o Agente)
Antes de dar qualquer tarefa funcional como concluída, o agente deve garantir:
- [ ] **Desempenho Estático:** Nenhuma página deve quebrar o build do Astro. Todo o roteamento e conteúdo textual devem ser pre-renderizados, com exceção do quiz e animações estritas.
- [ ] **Gestão de Conteúdo Centralizada:** Nenhum dado de serviço, post de blog, item de menu ou configuração de contato pode estar "chumbado" no componente. Devem sempre consumir a pasta `src/data/`.
- [ ] **Experiência Visual:** A interface deve respeitar estritamente a paleta de cores e tipografia definida no `DESIGN.md`, utilizando as variáveis utilitárias do Tailwind CSS.
- [ ] **Interações sem Quebras:** Modais de vídeo e menus responsivos devem funcionar perfeitamente com os scripts em `src/scripts/` (Vanilla JS), sem depender de hidratação React pesada. *(Os modais de detalhe de serviço — "Ver solução detalhada" — foram removidos dos cards de soluções.)*