const fetchJson = require('./fetchJson')
const { map: { nestHemisphere } } = require('../config')
const { pokemon: masterfile } = require('../../data/masterfile.json')

module.exports = async function fetchNests() {
  const { [nestHemisphere]: nesting } = await fetchJson('https://raw.githubusercontent.com/ccev/pogoinfo/v2/nests/species-ids.json')
  return nesting.map(pokemon => `${pokemon}-${masterfile[pokemon].default_form_id || 0}`)
}
