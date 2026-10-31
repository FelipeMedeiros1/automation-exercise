export function criarUsuario(overrides = {}) {
  return {
    name: 'QA Teste',
    email: `qa.${Date.now()}.${Cypress._.random(100000, 999999)}@teste.com`,
    password: 'SenhaTeste123!',
    title: 'Mrs',
    birth_date: '15',
    birth_month: '5',
    birth_year: '1995',
    firstname: 'QA',
    lastname: 'Teste',
    company: 'Empresa Teste',
    address1: '123 Test Street',
    address2: 'Apartment 00',
    country: 'Canada',
    zipcode: 'BRA 2T6',
    state: 'Ontario',
    city: 'Toronto',
    mobile_number: '4165550123',
    ...overrides,
  };
}
