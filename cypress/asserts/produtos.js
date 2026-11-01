import { produtos } from '../modules/produtos/locators';

export function validarListaProdutos() {
  cy.location('pathname').should('eq', '/products');
  cy.contains(...produtos.tituloLista, { timeout: 30000 }).should('be.visible');
  cy.get(produtos.lista).should('be.visible');
  return cy.get(produtos.item).first().should('be.visible');
}

export function validarDetalhesProduto(esperado) {
  cy.location('pathname').should('eq', esperado.caminho);
  cy.get(produtos.detalhes).should('be.visible');
  cy.get(produtos.nome).should('be.visible').and('have.text', esperado.nome);
  cy.get(produtos.preco).should('be.visible').and(($preco) => {
    expect($preco.text().replace(/\s+/g, ' ').trim(), 'preco do produto selecionado')
      .to.eq(esperado.preco);
  });
  cy.contains(...produtos.categoria).should('be.visible')
    .and('match', 'p').and(($campo) => {
      expect($campo.text().trim()).to.match(/^Category:\s*\S.+>\s*\S/);
    });
  cy.contains(...produtos.disponibilidade).should('be.visible').and(($campo) => {
    expect($campo.text().trim()).to.match(/^Availability:\s*\S/);
  });
  cy.contains(...produtos.condicao).should('be.visible').and(($campo) => {
    expect($campo.text().trim()).to.match(/^Condition:\s*\S/);
  });
  return cy.contains(...produtos.marca).should('be.visible').and(($campo) => {
    expect($campo.text().trim()).to.match(/^Brand:\s*\S/);
  });
}

export function validarProdutosPesquisados(termo) {
  cy.contains(...produtos.tituloPesquisa, { timeout: 30000 }).should('be.visible');
  cy.get(produtos.pesquisa).should('have.value', termo);
  cy.get(produtos.item).first().should('be.visible');
  return cy.get(produtos.nomesResultados).should(($nomes) => {
    expect($nomes.length, 'quantidade de resultados').to.be.greaterThan(0);
    $nomes.toArray().forEach((elemento) => {
      expect(elemento.textContent.trim().toLowerCase(), 'produto relacionado a pesquisa')
        .to.include(termo.toLowerCase());
    });
  });
}
