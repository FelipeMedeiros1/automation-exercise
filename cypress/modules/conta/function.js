import { conta } from './locators';
import { continuarParaInicio } from '../../common/navigation';
import { excluirConta as excluirContaPelaApi } from '../../requests/accounts';
import { validarContaExcluida, validarExclusaoPelaApi } from '../../asserts/conta';

export function excluirConta() {
  cy.contains(...conta.excluir).click();
  return validarContaExcluida();
}

export function limparConta(usuario) {
  return excluirContaPelaApi(usuario).then(validarExclusaoPelaApi);
}

export function excluirUsuario() {
  excluirConta();
  return continuarParaInicio();
}
