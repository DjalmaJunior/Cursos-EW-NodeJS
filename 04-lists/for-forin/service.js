const axios = require('axios')

const URL=`https://swapi.dev/api/films/1/`

async function obterOpcoes () {
  const url = `${URL}`
  const response = await axios.get(url)
  return response
}

async function* processAndReturn (dataProcess) {
  for (let dataUrl of dataProcess) {
    const resp = await axios.get(dataUrl)
    yield resp?.data
  }
}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

obterOpcoes()
.then(function ({ data: resultado }) {
  let count = 1
  let options = {}

  for (let key in resultado) {
    let option = count++
    options[option] = key

    console.log('Opção %s', `${option} - ${key}`)
  }

  const stdin = process.openStdin()
  process.stdout.write('Para cancelar use ctrl+c a qualquer momento.\n')
  process.stdout.write('Informe a opção desejada.\n')

  stdin.addListener('data', async function (dataStdin) {
    dataStdin = Number(dataStdin)

    if (!options[dataStdin]) {
      console.log('Opção inválida!')
    } else {
      const dataToUse = resultado[options[dataStdin]]

      if (!!dataToUse?.some?.((v) => validURL(v))) {
        const urls = dataToUse;

        for await (let dataUrl of processAndReturn(urls)) {
          console.log('%s', options[dataStdin], dataUrl)
        }
      } else {
        console.log('Valor para %s', dataStdin, dataToUse)
      }
    }
  })
})
.catch(function (error) {
  console.log('error', error)
})
