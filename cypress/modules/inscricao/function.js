import { inscricao } from './locators';
import { abrirSistema } from '../../common/navigation';
import { criarUsuario } from '../../utils/user';
import { validarFormularioInscricao, validarInscricaoRealizada } from '../../asserts/inscricao';

export function abrirInscricao() {
  cy.get(inscricao.rodape).scrollIntoView();
  return validarFormularioInscricao();
}

export function enviarInscricao(email) {
  cy.get(inscricao.email).clear().type(email);
  return cy.get(inscricao.enviar).click();
}

export function inscreverEmailNaPaginaInicial() {
  const { email } = criarUsuario();
  abrirSistema();
  abrirInscricao();
  enviarInscricao(email);
  return validarInscricaoRealizada();
}
