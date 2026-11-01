import { inscricao } from '../modules/inscricao/locators';

export function validarFormularioInscricao() {
  cy.contains(...inscricao.titulo).should('be.visible');
  return cy.get(inscricao.email).should('be.visible').and('be.enabled');
}

export function validarInscricaoRealizada() {
  return cy.get(inscricao.sucesso).should('be.visible')
    .and('have.text', 'You have been successfully subscribed!');
}
