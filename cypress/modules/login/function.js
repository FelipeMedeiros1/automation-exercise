import { login } from './locators';
import { criarUsuario } from '../../utils/user';
import { criarConta } from '../../requests/accounts';
import { abrirSistema, abrirAutenticacao } from '../../common/navigation';
import { validarFormularioLogin, validarLoginRecusado } from '../../asserts/login';
import { validarUsuarioConectado, validarCriacaoPelaApi } from '../../asserts/conta';
import { excluirConta, limparConta } from '../conta/function';

let usuarioLogin;
let contaCriada = false;

export function prepararLoginValido() {
  usuarioLogin = criarUsuario({
    name: 'QA Login',
    email: `qa.login.${Date.now()}.${Cypress._.random(100000, 999999)}@teste.com`,
  });
  contaCriada = false;
  return criarConta(usuarioLogin).then((body) => {
    contaCriada = body.responseCode === 201;
    validarCriacaoPelaApi(body);
  });
}

export function limparLoginValido() {
  if (contaCriada) {
    return limparConta(usuarioLogin).then(() => { contaCriada = false; });
  }
}

export function abrirLogin() {
  abrirSistema();
  abrirAutenticacao();
  return validarFormularioLogin();
}

export function fazerLogin({ email, password }) {
  cy.get(login.email).type(email);
  cy.get(login.senha).type(password, { log: false });
  return cy.get(login.entrar).click();
}

export function executarLoginValido() {
  abrirLogin();
  fazerLogin(usuarioLogin);
  validarUsuarioConectado(usuarioLogin.name);
  return excluirConta().then(() => { contaCriada = false; });
}

export function executarLoginInvalido() {
  const usuario = criarUsuario({ password: 'SenhaIncorreta123!' });
  abrirLogin();
  fazerLogin(usuario);
  return validarLoginRecusado();
}
