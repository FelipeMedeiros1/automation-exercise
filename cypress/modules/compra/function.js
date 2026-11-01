import { criarConta } from '../../requests/accounts';
import { abrirLogin, fazerLogin } from '../login/function';
import { validarCriacaoPelaApi, validarUsuarioConectado } from '../../asserts/conta';
import { compra } from './locators';
import { produtos } from '../produtos/locators';
import { abrirProdutos, abrirPrimeiroProduto } from '../produtos/function';
import { cadastrarUsuario } from '../cadastro/function';
import { excluirUsuario, limparConta } from '../conta/function';
import { criarUsuario } from '../../utils/user';
import { criarPagamento } from '../../utils/payment';
import { validarProdutoAdicionado, validarCarrinho, validarCheckout,
  validarPedidoConfirmado } from '../../asserts/compra';

let usuarioCompra;
let contaCriada = false;
let produtoCompra;

export function prepararCompra() {
  usuarioCompra = criarUsuario();
  contaCriada = false;
  produtoCompra = undefined;
}

export function cadastrarAntesDaCompra() {
  return cadastrarUsuario(usuarioCompra).then(() => { contaCriada = true; });
}

export function adicionarProdutoAoCarrinho() {
  abrirProdutos();
  abrirPrimeiroProduto();
  cy.get(produtos.nome).invoke('text').then((nome) => {
    produtoCompra = { nome: nome.trim() };
  });
  cy.get(produtos.preco).invoke('text').then((preco) => {
    produtoCompra.preco = preco.replace(/\s+/g, ' ').trim();
  });
  cy.get(compra.adicionar).click();
  validarProdutoAdicionado();
  cy.get(compra.continuarComprando).click();
  cy.get(compra.carrinho).click();
  return cy.then(() => validarCarrinho(produtoCompra));
}

export function concluirCompra() {
  cy.contains(...compra.checkout).click();
  cy.then(() => validarCheckout(usuarioCompra, produtoCompra));
  cy.get(compra.comentario).type('Pedido ficticio para teste de compra.');
  cy.get(compra.fazerPedido).click();
  const pagamento = criarPagamento();
  cy.get(compra.nomeCartao).type(pagamento.nome);
  cy.get(compra.numeroCartao).type(pagamento.numero, { log: false });
  cy.get(compra.cvc).type(pagamento.cvc, { log: false });
  cy.get(compra.mes).type(pagamento.mes);
  cy.get(compra.ano).type(pagamento.ano);
  cy.get(compra.pagar).click();
  return validarPedidoConfirmado();
}

export function excluirUsuarioDaCompra() {
  return excluirUsuario().then(() => { contaCriada = false; });
}

export function limparCompra() {
  if (contaCriada) {
    return limparConta(usuarioCompra).then(() => { contaCriada = false; });
  }
}

export function prepararCompraComLogin() {
  prepararCompra();
  return criarConta(usuarioCompra).then((body) => {
    contaCriada = body.responseCode === 201;
    validarCriacaoPelaApi(body);
  });
}

export function loginAntesDaCompra() {
  abrirLogin();
  fazerLogin(usuarioCompra);
  return validarUsuarioConectado(usuarioCompra.name);
}
