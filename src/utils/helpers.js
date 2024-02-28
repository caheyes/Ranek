export function serialize(obj) {
  let queryString = '';

  for (let key in obj) {
    //verificando cada chave da rota
    queryString += `&${key}=${obj[key]}`;
  }

  return queryString;
}

export function filtroPreco(valor) {
  valor = Number(valor);

  if (!isNaN(valor)) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency', //estilo de moeda
      currency: 'BRL',
    });
  } else {
    return '';
  }
}
