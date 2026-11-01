/// <reference types="cypress" />
import { prepararCompraComLogin, loginAntesDaCompra, adicionarProdutoAoCarrinho,
  concluirCompra, excluirUsuarioDaCompra, limparCompra } from '../modules/compra/function';

describe('Caso 16 - Login antes de finalizar a compra', () => {
  beforeEach(() => {
    prepararCompraComLogin();
  });

  afterEach(() => {
    limparCompra();
  });

  it('deve fazer login, concluir o pedido e excluir a conta', () => {
    loginAntesDaCompra();
    adicionarProdutoAoCarrinho();
    concluirCompra();
    excluirUsuarioDaCompra();
  });
});
