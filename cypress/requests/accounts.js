import { obterCorpo } from '../utils/response';

export function criarConta(usuario) {
  return cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    log: false,
    body: usuario,
  }).then(obterCorpo);
}

export function excluirConta({ email, password }) {
  return cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    log: false,
    body: { email, password },
  }).then(obterCorpo);
}
