const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./Heroi')

const initCommander = () => {
  const commander = Commander
    .version('v1');

  const opcoes = [
    {
      alias: 'n',
      nome: 'nome',
      descricao: 'Nome do herói',
      valor: true,
      acao: false
    },
    {
      alias: 'p',
      nome: 'poder',
      descricao: 'Poder do herói',
      valor: true,
      acao: false
    },
    {
      alias: 'id',
      nome: 'id',
      descricao: 'Id do herói',
      valor: true,
      acao: false
    },
    {
      alias: 'c',
      nome: 'cadastrar',
      descricao: 'Cadastrar um herói',
      valor: false,
      acao: true
    },
    {
      alias: 'l',
      nome: 'listar',
      descricao: 'Listar heróis',
      valor: false,
      acao: true
    },
    {
      alias: 'r',
      nome: 'remover',
      descricao: 'Remover um herói pelo id',
      valor: false,
      acao: true
    },
    {
      alias: 'att',
      nome: 'atualizar',
      descricao: 'Atualiza um herói',
      valor: false,
      acao: true
    }
  ]

  for (const opcao of opcoes) {
    commander
      .option(`-${opcao.alias}, --${opcao.nome}${opcao.valor ? ` [value]` : ''}`, opcao.descricao)
  }

  commander
    .parse(process.argv)

  return opcoes
}

async function main() {
  const opcoes = initCommander()

  try {
    const valor = (option) => Commander.program.getOptionValue(option)
    const dados = opcoes.reduce((acc, act) => ({ ...acc, [act.nome]: valor(act.nome) }), {})
    const acoes = opcoes.filter(opcao => !!opcao.acao)

    const heroi = new Heroi(dados);

    let acaoSelecionada = Object
      .keys(dados)
      .find(comando => acoes
        .some(acao => acao.nome === comando && !!dados[comando]))

    if (acaoSelecionada) {
      switch (acaoSelecionada) {
        case 'cadastrar':
          {
            const resultado = Database.cadastrar(heroi)
  
            console.log(resultado)
          }
          break;
        case 'atualizar':
          {
            const { id, ...dadosAtualizar } = heroi
            const resultado = Database.atualizar(id, dadosAtualizar)
  
            console.log(resultado)
          }
        case 'listar':
          {
            const resultado = Database.listar();

            console.log(resultado)
          }
          break;
        case 'remover':
          {
            const resultado = Database.remover(heroi.id)

            console.log(resultado)
          }
          break;
        default:
          console.log('Sem comportamento definido para essa ação!')
      }
    }
  } catch (err) {
    console.error('Error:', err)
  }
}

main()
