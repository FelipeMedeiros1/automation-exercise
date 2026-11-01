/// <reference types="cypress" />
import { inscreverEmailNaPaginaInicial } from '../modules/inscricao/function';

describe('Caso 10 - Inscricao por email na pagina inicial', () => {
  it('deve confirmar a inscricao de um email pelo rodape', () => {
    inscreverEmailNaPaginaInicial();
  });
});
