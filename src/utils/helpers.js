export function serialize(obj) {
  let queryString = '';

  for (let key in obj) {
    //verificando cada chave da rota
    queryString += `&${key}=${obj[key]}`;
  }

  return queryString;
}
