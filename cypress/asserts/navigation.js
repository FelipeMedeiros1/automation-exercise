import { navigationLocators } from '../common/navigation.locators';
export function validarInicioVisivel() {
  return cy.get(navigationLocators.inicio).should('be.visible');
}

export function validarRetornoAoInicio() {
  return cy.location('pathname').should('eq', '/');
}
