import { cadastro } from '../modules/cadastro/locators';
export function validarInicioCadastro() {
  return cy.contains(...cadastro.inicio).should('be.visible');
}

export function validarFormularioCadastro() {
  return cy.contains(cadastro.formulario, { matchCase: false })
    .should('be.visible');
}

export function validarDadosConta(usuario) {
  cy.get(cadastro.nome).should('have.value', usuario.name);
  return cy.get(cadastro.email).should('have.value', usuario.email);
}

export function validarPreferencias() {
  cy.get(cadastro.newsletter).should('be.checked');
  return cy.get(cadastro.ofertas).should('be.checked');
}

export function validarContaCriada() {
  return cy.get(cadastro.contaCriada).should('be.visible')
    .and('contain.text', 'Account Created!');
}
