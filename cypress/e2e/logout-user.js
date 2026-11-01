/// <reference types="cypress" />
import { prepararLoginValido, limparLoginValido } from '../modules/login/function';
import { executarLogout } from '../modules/logout/function';

describe('Caso 4 - Logout do usuario', () => {
  beforeEach(() => {
    prepararLoginValido();
  });

  afterEach(() => {
    limparLoginValido();
  });

  it('deve fazer logout e retornar para a pagina de login', () => {
    executarLogout();
  });
});
