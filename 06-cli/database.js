const { readFileSync, writeFileSync } = require('fs')

class Database {
  constructor() {
    this.NOME_ARQUIVO = 'herois.json'
  }

  obterDadosArquivo() {
    const arquivo = readFileSync(this.NOME_ARQUIVO, 'utf8')
    
    return !!arquivo ? JSON.parse(arquivo.toString()) : []
  }
  escreverArquivo(dados) {
    writeFileSync(this.NOME_ARQUIVO, JSON.stringify(dados)) 
    return true
  }
  cadastrar(heroi) {
    const dados = this.obterDadosArquivo()
    const id = Date.now();

    const [exists] = this.listar(null, heroi.nome)

    if (exists) throw new Error('Já existe um herói com esse nome!')

    const heroiComId = {
      ...heroi,
      id
    }

    const dadosFinal = [...dados, heroiComId]
    const resultado = this.escreverArquivo(dadosFinal)

    return resultado && id
  }

  listar(id = null, nome = null) {
    const dados = this.obterDadosArquivo()
    const dadosFiltrados = dados.filter(item => (id ? item.id === Number(id) : nome ? item.nome.toLowerCase() === nome.toLowerCase() : true))
    
    return dadosFiltrados
  }

  remover(id) {
    if (!id) {
      const listaLimpa = this.escreverArquivo([])
      return listaLimpa
    }

    const dados = this.obterDadosArquivo()

    const indexToDelete = dados.findIndex(item => item.id === Number(id))

    if (!~indexToDelete) throw new Error('Herói não encontrado!')

    dados.splice(indexToDelete, 1)
    return this.escreverArquivo(dados)
  }

  atualizar(id, dadosAtualizar) {
    if (!id) throw new Error('Necessário informar um id para atualizar!')
    if (!dadosAtualizar) throw new Error('Sem dados para atualizar!')

    const dados = this.obterDadosArquivo()

    const indexToUpdate = dados.findIndex(item => item.id === Number(id))

    if (!~indexToUpdate) throw new Error('Herói não encontrado!')

    const novosDados = dados.map((dado, index) => {
      if (index === indexToUpdate) {
        dado = { ...dado, ...dadosAtualizar }
      }

      return dado
    })

    return this.escreverArquivo(novosDados)
  }
}

module.exports = new Database()
