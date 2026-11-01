/// <reference types="cypress" />
import { consultarDetalhesPrimeiroProduto } from '../modules/produtos/function';

describe('Caso 8 - Lista de produtos e detalhes do produto', () => {
  it('deve exibir os produtos e os detalhes do primeiro produto', () => {
    consultarDetalhesPrimeiroProduto();
  });
});
