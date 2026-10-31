import { navigationLocators } from './navigation.locators';
import { validarInicioVisivel, validarRetornoAoInicio } from '../asserts/navigation';

export function abrirSistema() {
  cy.visit('/');
  return validarInicioVisivel();
}

export function abrirAutenticacao() {
  return cy.contains(...navigationLocators.autenticacao).click();
}

export function continuar() {
  return cy.get(navigationLocators.continuar).click();
}

export function continuarParaInicio() {
  continuar();
  return validarRetornoAoInicio();
}
