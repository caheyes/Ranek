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

export function mapFields(options) {
  const object = {};
  for (let x = 0; x < options.fields.length; x++) {
    const field = [options.fields[x]];
    object[field] = {
      get() {
        return this.$store.state[options.base][field];
      },
      set(value) {
        this.$store.commit(options.mutation, { [field]: value });
      },
    };
  }
  return object;
}
