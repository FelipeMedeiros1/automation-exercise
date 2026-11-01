# Automation Exercise - Cypress

[![Cypress E2E Tests](https://github.com/FelipeMedeiros1/automation-exercise/actions/workflows/cypress.yml/badge.svg)](https://github.com/FelipeMedeiros1/automation-exercise/actions/workflows/cypress.yml)

Projeto individual de automacao dos casos 1, 2, 3, 4, 5, 8, 9, 10, 15 e 16 do
[Automation Exercise](https://www.automationexercise.com/test_cases).

Repositorio da entrega: https://github.com/FelipeMedeiros1/automation-exercise

## Requisitos e instalacao

- Node.js 24 (versao definida em `.nvmrc`).
- npm e Google Chrome instalados.
- Acesso a internet: os testes utilizam a aplicacao publica e suas APIs.

```bash
git clone https://github.com/FelipeMedeiros1/automation-exercise.git
cd automation-exercise
npm ci
npx cypress install
```

O `package-lock.json` acompanha o projeto para reproduzir as dependencias.

## Executar

```bash
# Analise estatica e os 10 casos no Chrome
npm run validate

# Somente a suite completa, com relatorio HTML
npm test

# Interface interativa do Cypress
npm run cy:open

# Executar um caso
npm test -- --spec cypress/e2e/products-details.js

# Somente analise estatica
npm run lint
```

## Casos implementados

| Caso | Cenario | Arquivo em `cypress/e2e` |
| --- | --- | --- |
| 1 | Cadastro e exclusao de usuario | `register-user.js` |
| 2 | Login com credenciais corretas | `login-user.js` |
| 3 | Login com credenciais incorretas | `login-invalid-user.js` |
| 4 | Logout e retorno para a pagina de login | `logout-user.js` |
| 5 | Cadastro com email ja existente | `register-existing-user.js` |
| 8 | Lista de produtos e detalhes do primeiro produto | `products-details.js` |
| 9 | Pesquisa de produtos | `search-products.js` |
| 10 | Inscricao por email na pagina inicial | `subscription-home.js` |
| 15 | Cadastro antes da finalizacao da compra | `order-register-before-checkout.js` |
| 16 | Login antes da finalizacao da compra | `order-login-before-checkout.js` |

## Organizacao

```text
.github/workflows/cypress.yml     Execucao automatica e upload de evidencias
cypress/
  e2e/                           Cenarios com chamadas de funcoes
  modules/
    cadastro/
    compra/
    conta/
    inscricao/
    login/
    logout/
    produtos/
  asserts/                       Validacoes por funcionalidade
  requests/                      Criacao e exclusao de contas pela API
  common/                        Navegacao e locators compartilhados
  utils/                         Dados ficticios e tratamento de respostas
  support/e2e.js                 Integracao do relatorio com o Cypress
```

Cada modulo tem `function.js` para seus fluxos e `locators.js` para seletores e
textos de localizacao. Os testes contêm somente chamadas aos modulos; as
validacoes ficam em `asserts`. Os nomes `login`, `cadastro`, `conta` e os demais
objetos de locators seguem a nomenclatura do projeto.

## Padroes utilizados

- Seletores `data-qa` quando disponiveis; IDs, links e seletores de componente
  quando a aplicacao nao oferece identificadores de teste.
- Dados exclusivos por execucao, com nomes, enderecos e pagamento ficticios.
- Cenarios independentes: os casos que precisam de conta existente a preparam
  pela API; o caso 1 e o caso 15 fazem o cadastro pela interface.
- Os casos 2, 4, 5, 15 e 16 possuem limpeza da conta de preparacao em `afterEach`.
- Os casos 1, 2, 15 e 16 validam a exclusao pela interface conforme o enunciado.
- A lista geral valida a visibilidade do primeiro produto. Os detalhes comparam
  nome, preco e URL com o item selecionado. A pesquisa confere a correspondencia
  de todos os nomes retornados com o termo informado.
- As compras validam carrinho, quantidade, valores, enderecos de entrega e
  cobranca, revisao do pedido e confirmacao final.
- Esperas por elementos e assertions com retentativa do Cypress, sem pausas fixas,
  sem ignorar erros de JavaScript e sem desativar falhas por HTTP.
- Uma repeticao automatica por teste em modo `run`; nenhuma em modo interativo.
  O relatorio preserva as tentativas para permitir identificar instabilidade.

Na compra, o site pode mostrar a mensagem final `Congratulations! Your order has
been confirmed!`, enquanto o enunciado descreve `Your order has been placed
successfully!`. O assert aceita essas duas confirmacoes e exige tambem o titulo
`Order Placed!` e a URL final do pedido.

## Relatorios e evidencias

Depois de `npm test` ou `npm run validate`:

- `cypress/reports/index.html`: relatorio HTML com os resultados e screenshots
  de falha incorporados. Abra o arquivo no navegador.
- `cypress/reports/index.json`: resultados estruturados da mesma execucao.
- `cypress/screenshots/`: capturas automaticas em caso de falha.
- `cypress/videos/`: gravacoes dos testes, inclusive execucoes bem-sucedidas.

O relatorio e atualizado a cada execucao de `cypress run`. Para produzir a
entrega completa, rode a suite sem `--spec`. Os arquivos gerados sao ignorados
pelo Git e publicados como artefatos no Actions.

Relatorio configurado conforme a
[documentacao do cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter).

## GitHub Actions

O workflow `.github/workflows/cypress.yml` executa em pushes e pull requests para
`main` e tambem manualmente por **Actions > Cypress E2E Tests > Run workflow**.

Ele instala as dependencias com `npm ci`, executa o ESLint e roda os 10 casos no
Chrome. Se uma verificacao falhar, a execucao fica vermelha. O passo de upload
roda mesmo em falhas e disponibiliza relatorios e evidencias durante 14 dias.
Nao e necessario Cypress Cloud nem configurar credenciais de usuarios do site.

Para consultar as evidencias:

1. Acesse a [pagina de execucoes](https://github.com/FelipeMedeiros1/automation-exercise/actions/workflows/cypress.yml).
2. Abra uma execucao concluida e confira os jobs e logs.
3. Em **Artifacts**, baixe `cypress-evidence-<numero da execucao>`.
4. Extraia o ZIP e abra `reports/index.html`. Os videos ficam em `videos/`.

A automacao depende da disponibilidade do site publico. Erros externos, como
HTTP 503, continuam visiveis nos logs; uma suite verde comprova aquela execucao,
sem garantir disponibilidade futura do servico.

## Entrega

Enviar a URL do repositorio e indicar uma execucao verde do Actions com o
artefato de evidencias disponivel. A configuracao do workflow so e validada no
GitHub depois que os arquivos sao enviados e o job termina.
