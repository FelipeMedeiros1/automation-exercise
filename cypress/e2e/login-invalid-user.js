/// <reference types="cypress" />
import { executarLoginInvalido } from '../modules/login/function';

describe('Caso 3 - Login com email e senha incorretos', () => {
  it('deve exibir erro ao tentar entrar com credenciais invalidas', () => {
    executarLoginInvalido();
  });
});
