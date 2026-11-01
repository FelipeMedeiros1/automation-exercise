/// <reference types="cypress" />
import { prepararCadastroExistente, cadastrarComEmailExistente,
  limparCadastroExistente } from '../modules/cadastro/function';

describe('Caso 5 - Cadastrar usuario com email existente', () => {
  beforeEach(() => {
    prepararCadastroExistente();
  });

  afterEach(() => {
    limparCadastroExistente();
  });

  it('deve recusar o cadastro com um email ja registrado', () => {
    cadastrarComEmailExistente();
  });
});
