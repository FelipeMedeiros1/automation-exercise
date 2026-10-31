/// <reference types="cypress" />
import { cadastrarUsuario } from '../modules/cadastro/function';
import { excluirUsuario } from '../modules/conta/function';

describe('Caso 1 - Cadastrar usuario', () => {
  it('deve cadastrar um usuario e excluir a conta ao final', () => {
    cadastrarUsuario();
    excluirUsuario();
  });
});
