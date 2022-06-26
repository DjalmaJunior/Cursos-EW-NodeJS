const Emissor = require('./Emissor');

const evento = Emissor.eventos.click

const emissor = Emissor.client

// let count = 0
// setInterval(() => {
//   emissor.emit(evento, 'no ok ' + (count++))
// }, 1000)

const stdin = process.openStdin()
process.stdout.write('Para cancelar use ctrl+c a qualquer momento.\n')
process.stdout.write('Informe o local de click.\n')


stdin.addListener('data', (value) => {
  emissor.emit(evento, value.toString().trim())
})