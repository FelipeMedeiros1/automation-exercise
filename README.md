# Automation Exercise - Cypress

Casos implementados: 1 (cadastro), 2 (login valido) e 3 (login invalido).
Cada teste usa dados exclusivos e pode rodar independentemente.

## Estrutura

- `cypress/e2e`: descricao dos casos e chamadas aos modulos, sem logica ou asserts.
- `cypress/modules/login/function.js`: preenchimento do login e mensagem de erro.
- `cypress/modules/cadastro/function.js`: formulario, preferencias, endereco e confirmacao do cadastro.
- `cypress/modules/conta/function.js`: usuario conectado e exclusao da conta.
- `cypress/asserts`: validacoes da interface e dos resultados da API.
- `cypress/requests`: chamadas HTTP para criar e excluir contas de preparacao.
- `cypress/common`: navegacao compartilhada entre os cenarios.
- `cypress/utils`: geracao de usuarios e normalizacao das respostas da API.

Os testes chamam os fluxos dos modulos. Os modulos coordenam as acoes,
a preparacao, a limpeza e as validacoes definidas em asserts. O caso 1 cadastra pela
interface; o caso 2 prepara uma conta pela API e a remove mesmo se o login falhar.
O caso 3 usa um usuario nao cadastrado.

## Executar no Git Bash

```bash
cd /c/projetos/automation-exercise
npm install
npx cypress install
npm run cy:open
```

Para executar todos os testes: `npm test`.
Para executar um caso: `npm test -- --spec cypress/e2e/login-user.js`.

Enunciado: https://www.automationexercise.com/test_cases

Cada modulo possui um locators.js com seus seletores e textos de localizacao.
As acoes e asserts importam esses locators. Os seletores compartilhados de
navegacao ficam em cypress/common/navigation.locators.js.
