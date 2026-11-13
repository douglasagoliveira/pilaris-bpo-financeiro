# Fontes do site

Arquivos servidos pelo próprio site (nenhuma requisição a terceiros). São exatamente os
mesmos binários que o Google Fonts entregava para a versão anterior do site, o que mantém
a tipografia idêntica.

| Arquivo | Família | Pesos | Conjunto |
|---|---|---|---|
| `public-sans-latin-wght-normal.woff2` | Public Sans (variável, eixo `wght`) | 300 a 900 | latin |
| `dm-mono-latin-400-normal.woff2` | DM Mono Regular | 400 | latin |
| `dm-mono-latin-500-normal.woff2` | DM Mono Medium | 500 | latin |

A configuração fica em `astro.config.mjs` (bloco `fonts`). O conjunto `latin` cobre todo o
português. Se um dia o conteúdo precisar de caracteres de outros idiomas (por exemplo
`ł`, `ş`, `ž`), acrescente o arquivo `latin-ext` da mesma família como nova variante.

## Licença

As duas famílias são distribuídas sob a SIL Open Font License 1.1, que permite uso e
redistribuição, inclusive comercial.

- Public Sans: Copyright 2015 The Public Sans Project Authors (https://github.com/uswds/public-sans)
- DM Mono: Copyright 2020 The DM Mono Project Authors (https://www.github.com/googlefonts/dm-mono)
- Texto da licença: https://openfontlicense.org
