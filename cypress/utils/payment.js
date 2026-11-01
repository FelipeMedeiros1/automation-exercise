export function criarPagamento() {
  return {
    nome: 'QA Teste',
    numero: '4111111111111111',
    cvc: '123',
    mes: '12',
    ano: String(new Date().getFullYear() + 2),
  };
}
