const EventEmitter = require('events');

class Emissor extends EventEmitter {
  static client;
  static eventos = {
    click: 'usuario:click'
  };

  constructor () {    
    if (!Emissor.client) {
      Emissor.client = super()
  
      Emissor.listenUserClick()
    }
  }

  static listenUserClick () {
    const evento = Emissor.eventos.click

    Emissor.client.on(evento, (click) => {
      console.log('Um usuário clicou', click)
    })  
  }
}
new Emissor()

module.exports = Emissor;
