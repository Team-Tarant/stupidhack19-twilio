const url = require('url')
const xmlescape = require('xml-escape')
const { VoiceResponse } = require('twilio').twiml

const getRandomBeginning = () => {
  const beginnings = [
    'Did you know that', 
    'I just got a quick question', 
    'We are currently drinking, and we thought that'
  ]
  return beginnings[Math.floor(Math.random() * beginnings.length)]
}

module.exports = (req, res) => {
  const { query } = url.parse(req.url, true)

  if (!query.text) {
    res.writeHead(400)
    res.end('name or place query params missing')
    return
  }

  const { text } = query

  const t = new VoiceResponse()
  const sayEn = msg => t.say({ language: 'en-US', voice: 'man' }, msg)

  sayEn('Hello')
  sayEn(getRandomBeginning())
  sayEn(xmlescape(text))
  sayEn('Goodbye')

  res.writeHead(200, { 'Content-Type': 'text/xml; charset=utf-8' })
  res.end(t.toString())
}
