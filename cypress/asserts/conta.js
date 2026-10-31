import { conta } from '../modules/conta/locators';

export function validarUsuarioConectado(nome) {
  return cy.contains(...conta.usuarioPorNome(nome)).should('be.visible');
}

export function validarContaExcluida() {
  return cy.get(conta.contaExcluida).should('be.visible')
    .and('contain.text', 'Account Deleted!');
}

export function validarCriacaoPelaApi(body) {
  expect(body.responseCode, 'conta de preparacao criada').to.eq(201);
  expect(body.message).to.eq('User created!');
}

export function validarExclusaoPelaApi(body) {
  expect(body.responseCode, 'limpeza da conta').to.eq(200);
  expect(body.message).to.eq('Account deleted!');
}
