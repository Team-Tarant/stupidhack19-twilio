const url = require('url')
const xmlescape = require('xml-escape')
const { VoiceResponse } = require('twilio').twiml

const GATHER_ACTION_URL = '/api/twiml/come-bontho-callback'

module.exports = (req, res) => {
  const { query } = url.parse(req.url, true)

  if (!query.name || !query.place) {
    res.writeHead(400)
    res.end('name or place query params missing')
    return
  }

  const { name, place } = query

  const t = new VoiceResponse()
  const sayEn = msg => t.say({ voice: 'Polly.Joey' }, msg)
  const sayFi = msg => t.say({ language: 'fi-FI' }, msg)

  sayEn('Heyyy, this is')
  sayFi(` ${xmlescape(name)}.`)
  sayEn('Come drink with us at ')
  sayFi(` ${xmlescape(place)}`)

  sayEn("If you're down, press 1.")
  sayEn("If you're not down, press 2.")
  t.play({ digits: '1', loop: 1 })
  t.gather({
    numDigits: 1,
    timeout: 5,
    action: GATHER_ACTION_URL,
    actionOnEmptyResult: true
  })

  res.writeHead(200, { 'Content-Type': 'text/xml; charset=utf-8' })
  res.end(t.toString())
}
