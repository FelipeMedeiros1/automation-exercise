import { criarConta } from '../../requests/accounts';
import { limparConta } from '../conta/function';

let usuarioExistente;
let contaExistenteCriada = false;

import { cadastro } from './locators';
import { criarUsuario } from '../../utils/user';
import { abrirSistema, abrirAutenticacao, continuar } from '../../common/navigation';
import { validarInicioCadastro, validarFormularioCadastro, validarDadosConta,
  validarPreferencias, validarContaCriada, validarEmailExistente } from '../../asserts/cadastro';
import { validarUsuarioConectado, validarCriacaoPelaApi } from '../../asserts/conta';

export function iniciarCadastro({ name, email }) {
  cy.get(cadastro.nomeInicial).type(name);
  cy.get(cadastro.emailInicial).type(email);
  return cy.get(cadastro.iniciar).click();
}

export function preencherConta(usuario) {
  cy.get(cadastro.titulo(usuario.title)).check();
  validarDadosConta(usuario);
  cy.get(cadastro.senha).type(usuario.password, { log: false });
  cy.get(cadastro.dia).select(usuario.birth_date);
  cy.get(cadastro.mes).select(usuario.birth_month);
  cy.get(cadastro.ano).select(usuario.birth_year);
}

export function selecionarPreferencias() {
  cy.get(cadastro.newsletter).check();
  cy.get(cadastro.ofertas).check();
  return validarPreferencias();
}

export function preencherEndereco(usuario) {
  cy.get(cadastro.primeiroNome).type(usuario.firstname);
  cy.get(cadastro.sobrenome).type(usuario.lastname);
  cy.get(cadastro.empresa).type(usuario.company);
  cy.get(cadastro.endereco).type(usuario.address1);
  cy.get(cadastro.complemento).type(usuario.address2);
  cy.get(cadastro.pais).select(usuario.country);
  cy.get(cadastro.estado).type(usuario.state);
  cy.get(cadastro.cidade).type(usuario.city);
  cy.get(cadastro.cep).type(usuario.zipcode);
  return cy.get(cadastro.celular).type(usuario.mobile_number);
}

export function enviarCadastro() {
  return cy.get(cadastro.criarConta).click();
}

export function confirmacaoDeCadastro() {
  return cy.get(cadastro.contaCriada);
}

export function cadastrarUsuario(usuario = criarUsuario()) {
  abrirSistema();
  abrirAutenticacao();
  validarInicioCadastro();
  iniciarCadastro(usuario);
  validarFormularioCadastro();
  preencherConta(usuario);
  selecionarPreferencias();
  preencherEndereco(usuario);
  enviarCadastro();
  validarContaCriada();
  continuar();
  return validarUsuarioConectado(usuario.name);
}

export function prepararCadastroExistente() {
  usuarioExistente = criarUsuario({ name: 'QA Cadastro Existente' });
  contaExistenteCriada = false;
  return criarConta(usuarioExistente).then((body) => {
    contaExistenteCriada = body.responseCode === 201;
    validarCriacaoPelaApi(body);
  });
}

export function limparCadastroExistente() {
  if (contaExistenteCriada) {
    return limparConta(usuarioExistente).then(() => {
      contaExistenteCriada = false;
    });
  }
}

export function cadastrarComEmailExistente() {
  abrirSistema();
  abrirAutenticacao();
  validarInicioCadastro();
  iniciarCadastro(usuarioExistente);
  return validarEmailExistente();
}
