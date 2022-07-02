const {
  deepEqual,
  throws
} = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
  nome: 'Flash',
  poder: 'Speed',
  id: 1
}

describe('Suite de manipulação de Herois', () => {
  it('deve pequisar um heroi, usando arquivos', () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    const [resultado] = database.listar(expected.id)

    deepEqual(resultado, expected)
  })
  it('deve possuir um nome unico', () => {
    throws(() => {database.cadastrar(DEFAULT_ITEM_CADASTRAR)}, 'Herói deve ter um nome único')
  })
  it('deve cadastrar um heroi no arquivo', () => {
    const { id: olId, ...others } = DEFAULT_ITEM_CADASTRAR
    
    const dadosCadastro = {...others, nome: 'Batman' + Date.now()}
    
    const idGerado = database.cadastrar(dadosCadastro)
    const [{ id: idAct, ...actual}] = database.listar(idGerado)

    deepEqual(actual, dadosCadastro)
  })
})
