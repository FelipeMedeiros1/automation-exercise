/// <reference types="cypress" />
import { prepararLoginValido, executarLoginValido, limparLoginValido } from '../modules/login/function';

describe('Caso 2 - Login com email e senha corretos', () => {
  beforeEach(() => {
    prepararLoginValido();
  });

  afterEach(() => {
    limparLoginValido();
  });

  it('deve fazer login com credenciais validas e excluir a conta', () => {
    executarLoginValido();
  });
});
