import { conta } from '../modules/conta/locators';
import { logout } from '../modules/logout/locators';
import { validarFormularioLogin } from './login';

export function validarLogout() {
  cy.location('pathname').should('eq', '/login');
  validarFormularioLogin();
  cy.contains(...conta.usuarioConectado).should('not.exist');
  return cy.get(logout.sair).should('not.exist');
}
