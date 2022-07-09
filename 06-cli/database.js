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
    const dadosFiltrados = dados.filter(item => (id ? item.id === id : nome ? item.nome.toLowerCase() === nome.toLowerCase() : true))
    
    return dadosFiltrados
  }

  remover(id) {
    if (!id) {
      const listaLimpa = this.escreverArquivo([])
      return listaLimpa
    }

    const dados = this.obterDadosArquivo()

    const indexToDelete = dados.findIndex(item => item.id == id)

    if (!~indexToDelete) throw new Error('Usuário não encontrado!')

    dados.splice(indexToDelete, 1)
    return this.escreverArquivo(dados)
  }
}

module.exports = new Database()
