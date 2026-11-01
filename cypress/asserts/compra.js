import { compra } from '../modules/compra/locators';

export function validarProdutoAdicionado() {
  return cy.get(compra.modal).should('be.visible');
}

export function validarCarrinho(produto) {
  cy.location('pathname').should('eq', '/view_cart');
  cy.get(compra.tabela).should('be.visible');
  cy.get(compra.linhas).should('have.length', 1);
  cy.get(compra.nomeProduto).should('have.text', produto.nome);
  cy.get(compra.quantidade).should('have.text', '1');
  cy.get(compra.preco).should('have.text', produto.preco);
  return cy.get(compra.total).should('have.text', produto.preco);
}

export function validarCheckout(usuario, produto) {
  cy.location('pathname').should('eq', '/checkout');
  cy.contains(...compra.tituloEndereco).should('be.visible');
  cy.contains(...compra.tituloRevisao).should('be.visible');
  [compra.entrega, compra.cobranca].forEach((seletor) => {
    cy.get(seletor).should('be.visible')
      .and('contain.text', `${usuario.firstname} ${usuario.lastname}`)
      .and('contain.text', usuario.company)
      .and('contain.text', usuario.address1)
      .and('contain.text', usuario.address2)
      .and('contain.text', usuario.city)
      .and('contain.text', usuario.state)
      .and('contain.text', usuario.zipcode)
      .and('contain.text', usuario.country)
      .and('contain.text', usuario.mobile_number);
  });
  cy.get(compra.nomeProduto).should('have.text', produto.nome);
  return cy.get(compra.total).first().should('have.text', produto.preco);
}

export function validarPedidoConfirmado() {
  cy.location('pathname').should('match', /^\/payment_done\/\d+$/);
  cy.get(compra.pedidoConfirmado).should('be.visible')
    .and('contain.text', 'Order Placed!');
  return cy.contains(...compra.mensagemSucesso).should('be.visible');
}
