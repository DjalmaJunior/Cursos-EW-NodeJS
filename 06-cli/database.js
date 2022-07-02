const { readFileSync, writeFileSync } = require('fs')

class Database {
  constructor() {
    this.NOME_ARQUIVO = 'herois.json'
  }

  obterDadosArquivo() {
    const arquivo = readFileSync(this.NOME_ARQUIVO, 'utf8')

    return JSON.parse(arquivo.toString())
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
}

module.exports = new Database()
