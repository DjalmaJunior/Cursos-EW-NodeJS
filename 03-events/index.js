const EventEmitter = require('events')

class Emissor extends EventEmitter {

}

const emissor = new Emissor()

const evento = 'usuario:click'

emissor.on(evento, (click) => {
  console.log('Um usuário clicou', click)
})

// emissor.emit(evento, 'na barra de rolagem')
// emissor.emit(evento, 'no ok')

// let count = 0
// setInterval(() => {
//   emissor.emit(evento, 'no ok ' + (count++))
// }, 1000)

const stdin = process.openStdin()

stdin.addListener('data', (value) => {
  console.log(`Você digitou: ${value.toString().trim()}`)
})