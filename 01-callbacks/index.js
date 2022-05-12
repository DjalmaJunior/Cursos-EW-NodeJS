/* 
  0 Obter o usuário
  1 Obter o telefone
  2 Obter o endereço
*/

function obterUsuario (callback) {
  setTimeout(() => {
    return callback(null, {
      id: 1,
      nome: 'Aladin',
      dataNascimento: new Date()
    })
  }, 1000)
}

function obterTelefone (idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: '10101010',
      ddd: 82
    })
  }, 2000)
}

function obterEndereco (idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      endereco: 'blablabla'
    })
  }, 3000)
}

const resolve = (error, data) => {
  if (error) return console.error(error);

  if (data?.id) {
    obterTelefone(data.id, resolve)
    obterEndereco(data.id, resolve)
  }

  console.log(data)
}

obterUsuario(resolve)