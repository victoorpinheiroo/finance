# FINANCE — Sua vida financeira em boas mãos

Plataforma de educação financeira desenvolvida para a disciplina **Desenvolvimento Front-End para Web** da **Universidade Positivo**, orientada pelo professor **Fabricio Olivo**.

**Integrantes:** Victor Gabriel Santos Pinheiro ([@victoorpinheiroo](https://github.com/victoorpinheiroo)) e Tales Siqueira Peixoto ([@sol1sn](https://github.com/sol1sn))

## Como abrir

**Site publicado:** https://victoorpinheiroo.github.io/finance/

O site funciona offline. Basta abrir o arquivo `index.html` em um navegador moderno (testado no Chromium; recomenda-se Google Chrome ou Microsoft Edge). Não é necessário servidor, instalação ou conexão com a internet. Apenas os links externos, que levam a outros sites, precisam de internet.

## Tecnologias

- HTML5 semântico
- CSS3 (Grid, Flexbox, variáveis CSS, media queries)
- JavaScript puro
- Bootstrap 5.3.3 (arquivos locais em `lib/bootstrap`)
- Armazenamento local com `localStorage`

## Estrutura de pastas

```
finance/
├── index.html, sobre.html, aprenda.html, artigos.html, artigo.html,
│   favoritos.html, simuladores.html, movimentacoes.html, metas.html,
│   multimidia.html, contato.html
├── css/    base.css · bootstrap-tema.css · paginas.css · puro.css
├── js/     tema.js · comum.js · menu.js · dados.js · um arquivo por página
├── img/    fotos/ (imagens de licença livre do Pexels)
├── video/  finance-apresentacao.mp4 · pôster
├── audio/  reportagens da Radioagência Nacional (EBC)
├── lib/    bootstrap/ · fonts/ (Manrope e Inter, licença OFL)
└── doc/    documentação acadêmica
```

## Páginas

| Página | Arquivo | Tecnologia |
|---|---|---|
| Início | `index.html` | Bootstrap + JS |
| Sobre o FINANCE | `sobre.html` | **HTML, CSS e JS puros** |
| Aprenda | `aprenda.html` | Bootstrap + JS |
| Artigos | `artigos.html` | Bootstrap + JS |
| Leitura de artigo | `artigo.html?id=N` | Bootstrap + JS |
| Favoritos | `favoritos.html` | Bootstrap + JS |
| Planejamento financeiro | `simuladores.html` | Bootstrap + JS |
| Minhas movimentações | `movimentacoes.html` | Bootstrap + JS |
| Metas financeiras | `metas.html` | Bootstrap + JS |
| Multimídia | `multimidia.html` | **HTML, CSS e JS puros** |
| Contato | `contato.html` | Bootstrap + JS |

## Chaves usadas no localStorage

| Chave | Conteúdo |
|---|---|
| `finance_tema` | modo claro ou escuro |
| `finance_favoritos` | artigos e termos favoritados |
| `finance_movimentacoes` | receitas e despesas |
| `finance_metas` | metas financeiras |
| `finance_progresso` | módulos concluídos nas trilhas |
| `finance_mensagens` | mensagens do formulário de contato |

## Matriz de rastreabilidade dos requisitos

| # | Requisito do professor | Onde foi implementado |
|---|---|---|
| 1 | Estruturação e organização da pasta raiz | Pastas `css`, `js`, `img`, `video`, `audio`, `lib`, `doc`; HTML na raiz |
| 2 | HTML5 semântico | Todas as páginas: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure`, `dialog`, `details` |
| 3 | CSS com seletores TAG, CLASSE e ID | `css/base.css` (`body`, `h1`, `.painel`, `#areaAvisos`), `css/paginas.css` (`#barraLeitura`, `#tabelaProdutos`), `css/puro.css` (`#legendaVideo`) |
| 3 | CSS em linha, incorporado e externo | Em linha: atributo `style` em `index.html` (hero) e `sobre.html`; incorporado: `<style>` em `sobre.html`; externo: arquivos da pasta `css` |
| 4 | HTML, CSS e JS puros em pelo menos 2 páginas | `sobre.html` e `multimidia.html` (não carregam Bootstrap) |
| 5 | Menu com links internos e externos e efeito hover | Navbar de todas as páginas; submenu "Links úteis" com sites externos; `:hover` em `bootstrap-tema.css` e `puro.css` |
| 6 | Navbar, container responsivo e rodapé em todas as páginas | `header.site-header`, `main#conteudo` com `.container`/`.container-f`, `footer.site-footer` |
| 7 | Player de vídeo e áudio com controles nativos | `multimidia.html`: `<video controls>` e `<audio controls>` |
| 8 | CSS Grid | Galeria (`.galeria` em `puro.css`), `.lista-artigos`, `.grade-categorias`, `.glossario`, `.rodape-grade`, `.passos` |
| 9 | CSS Flexbox | Navbar, cards, gráficos de barras (`.grafico-barras`), `.busca-hero`, `.indicador` |
| 10 | Cards com título, imagem, texto e link distribuídos horizontalmente | `index.html` (seção Explore, 4 cards Bootstrap lado a lado); `artigos.html` (cards horizontais) |
| 11 | Interface responsiva (smartphone e desktop) | Media queries em todos os CSS; grid do Bootstrap; testado em 375px e 1366px |
| 12 | Tabela de dados mínima 4 × 4 com títulos | `aprenda.html`: tabela de 6 colunas × 5 linhas com `thead`; tabelas dinâmicas em `simuladores.html` e `movimentacoes.html` |
| 13 | Formulário de contato com text, email, select, submit e textarea | `contato.html` |
| 14 | Validações nativas: required, minlength, pattern, placeholder | `contato.html` (nome com `pattern`, e-mail, telefone, mensagem com `minlength`) e formulários das ferramentas |
| 15 | Estados :focus, :hover e :invalid estilizados | `css/bootstrap-tema.css` (`.form-control:focus`, `:hover`, `:invalid`) |
| 16 | Bootstrap para menus, botões, formulários, alertas e cards | Navbar com `collapse` e `dropdown`, `.btn`, `.form-control`, `.alert`, `.card`, `.nav-pills`, `.progress` |
| 17 | Eventos JavaScript para manipular o DOM | `click`, `submit`, `input`, `change`, `scroll`, `timeupdate`, `toggle` em todos os arquivos de `js/` |
| 18 | Estruturas sequencial, condicional, repetição e dados | Ex.: `js/movimentacoes.js` (`if/else`, `for`, `forEach`, arrays e objetos), `js/simuladores.js` (laço mês a mês dos juros compostos) |
| 19 | localStorage | `js/comum.js` (`lerDados`, `salvarDados`), usado por movimentações, metas, favoritos, progresso, contato e tema |
| 20 | GitHub | Repositório público https://github.com/victoorpinheiroo/finance e site publicado no GitHub Pages: https://victoorpinheiroo.github.io/finance/ |

## Créditos

- Fotografias e vídeo: [Pexels](https://www.pexels.com/pt-br/licenca/) (licença Pexels)
- Áudios: [Radioagência Nacional / EBC](https://agenciabrasil.ebc.com.br/radioagencia-nacional), reprodução autorizada mediante indicação da fonte
- Fontes: Manrope e Inter (SIL Open Font License 1.1)
- Bootstrap 5.3.3 (licença MIT)

Conteúdo de caráter educativo, sem recomendação de investimentos.
