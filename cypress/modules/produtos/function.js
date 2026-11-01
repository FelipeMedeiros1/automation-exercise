import { produtos } from './locators';
import { abrirSistema } from '../../common/navigation';
import { validarListaProdutos, validarDetalhesProduto, validarProdutosPesquisados } from '../../asserts/produtos';

export function abrirProdutos() {
  cy.get(produtos.abrir).click();
  return validarListaProdutos();
}

export function abrirPrimeiroProduto() {
  return cy.get(produtos.item).first().then(($produto) => {
    const esperado = {
      nome: $produto.find(produtos.nomeNaLista).text().trim(),
      preco: $produto.find(produtos.precoNaLista).text().replace(/\s+/g, ' ').trim(),
      caminho: $produto.find(produtos.verProduto).attr('href'),
    };

    return cy.wrap($produto).find(produtos.verProduto).click().then(() => {
      return validarDetalhesProduto(esperado);
    });
  });
}

export function consultarDetalhesPrimeiroProduto() {
  abrirSistema();
  abrirProdutos();
  return abrirPrimeiroProduto();
}

export function pesquisarProduto(termo = 'Blue Top') {
  abrirSistema();
  abrirProdutos();
  cy.get(produtos.pesquisa).clear().type(termo);
  cy.get(produtos.pesquisar).click();
  return validarProdutosPesquisados(termo);
}
