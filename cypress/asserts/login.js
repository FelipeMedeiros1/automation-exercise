import { conta } from '../modules/conta/locators';
import { login } from '../modules/login/locators';
export function validarFormularioLogin() {
  return cy.contains(...login.formulario).should('be.visible');
}

export function validarLoginRecusado() {
  cy.contains(...login.erro)
    .should('be.visible');
  cy.location('pathname').should('eq', '/login');
  return cy.contains(...conta.usuarioConectado).should('not.exist');
}
