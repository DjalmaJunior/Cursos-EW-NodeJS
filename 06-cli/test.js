const {
  deepEqual,
  throws
} = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
  nome: 'Flash',
  poder: 'Speed',
  id: null
}

describe('Suite de manipulação de Herois', () => {
  before(() => {
    database.remover()
    const id = database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    DEFAULT_ITEM_CADASTRAR.id = id
  })
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
    
    const dadosCadastro = {...others, poder: 'Dinheiro', nome: 'Batman' + Date.now()}
    
    const idGerado = database.cadastrar(dadosCadastro)
    const [{ id: idAct, ...actual}] = database.listar(idGerado)

    deepEqual(actual, dadosCadastro)
  })
  it('deve atualizar um heroi usando o id', () => {
    const dadosAtualizar = {
      nome: 'Superman',
      poder: 'Voo'
    }
    const expected = {
      ...DEFAULT_ITEM_CADASTRAR,
      ...dadosAtualizar
    }
    
    database.atualizar(expected.id, dadosAtualizar)
    const [resultado] = database.listar(expected.id)

    deepEqual(resultado, expected)
  })
  it('deve remover um heroi usando o id', () => {
    const expected = true
    const response = database.remover(DEFAULT_ITEM_CADASTRAR.id)
    deepEqual(response, expected)
  })
})
