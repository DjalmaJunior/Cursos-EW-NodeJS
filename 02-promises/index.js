/* 
  0 Obter o usuário
  1 Obter o telefone
  2 Obter o endereço
*/

const util = require('util')

const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject(new Error('quebrou'))
      resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date()
      })
    }, 1000)
  })
}

function obterTelefone (idUsuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        telefone: '10101010',
        ddd: 82
      })
    }, 2000)
  })
}

function obterEndereco (idUsuario, callback) {
  // return new Promise((resolve, reject) => {
    setTimeout(() => {
      return callback(null, {
        endereco: 'blablabla'
      })
    }, 3000)
  // })
}

// const usuarioPromise = obterUsuario()

// for (let i = 0; i < 5; i++) {
//     usuarioPromise
//       .then((usuario) => {
//         return obterTelefone(usuario.id)
//           .then((telefone) => {
//             return obterEnderecoAsync(usuario.id)
//               .then((endereco) => {
//                 return {
//                   ...usuario,
//                   ...telefone,
//                   ...endereco
//                 }
//               })
//           })
//       })
//       .then((dados) => {
//         console.log('response:', dados)
//       })
//       .catch((error) => {
//         console.error('ERROR:', error)
//       })

//       console.log('BATEU AQUI PRIMEIRO')
// }

  // Async e Await
main()
  async function main() {
    try {
      console.time('medida-promise')
      const usuario = await obterUsuario();
      // const telefone = await obterTelefone(usuario.id);
      // const endereco = await obterEnderecoAsync(usuario.id);

      const [telefone, endereco] = await Promise.all([
        obterTelefone(usuario.id), 
        obterEnderecoAsync(usuario.id)
      ])

      console.log({ usuario, telefone, endereco})
      console.timeEnd('medida-promise')
    } catch (error) {
      console.error('ERROR:', error)
    }
  }
