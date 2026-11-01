/// <reference types="cypress" />
import { prepararCompra, cadastrarAntesDaCompra, adicionarProdutoAoCarrinho,
  concluirCompra, excluirUsuarioDaCompra, limparCompra } from '../modules/compra/function';

describe('Caso 15 - Cadastrar antes de finalizar a compra', () => {
  beforeEach(() => {
    prepararCompra();
  });

  afterEach(() => {
    limparCompra();
  });

  it('deve cadastrar, concluir o pedido e excluir a conta', () => {
    cadastrarAntesDaCompra();
    adicionarProdutoAoCarrinho();
    concluirCompra();
    excluirUsuarioDaCompra();
  });
});
