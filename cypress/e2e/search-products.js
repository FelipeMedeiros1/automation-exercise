/// <reference types="cypress" />
import { pesquisarProduto } from '../modules/produtos/function';

describe('Caso 9 - Pesquisa de produtos', () => {
  it('deve exibir produtos relacionados ao termo pesquisado', () => {
    pesquisarProduto('Men Tshirt');
  });
});
