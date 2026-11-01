import { logout } from './locators';
import { autenticarUsuarioPreparado } from '../login/function';
import { validarLogout } from '../../asserts/logout';

export function sairDoSistema() {
  cy.get(logout.sair).should('be.visible').click();
  return validarLogout();
}

export function executarLogout() {
  autenticarUsuarioPreparado();
  return sairDoSistema();
}
