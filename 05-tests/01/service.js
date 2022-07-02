const { get } = require('axios')

const URL = (filme) => `https://swapi.dev/api/films/${filme}`

async function obterFilme(filme = 1) {
  const result = await get(URL(filme))
  return result.data
}

module.exports = {
  obterFilme
}
