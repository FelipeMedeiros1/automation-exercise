export function obterCorpo(response) {
  return typeof response.body === 'string'
    ? JSON.parse(response.body) : response.body;
}
