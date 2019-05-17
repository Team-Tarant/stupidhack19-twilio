const BodyParser = require('body-parser')
const { VoiceResponse } = require('twilio').twiml

const bodyParser = BodyParser.urlencoded({ extended: false })

const main = async (req, res) => {
  const t = new VoiceResponse()
  const sayEn = msg => t.say({ language: 'en-US', voice: 'man' }, msg)
  const sayFi = msg => t.say({ language: 'fi-FI' }, msg)

  if (req.body.Digits === '1') {
    t.play(
      {
        loop: 1
      },
      'https://www.myinstants.com/media/sounds/mylongestyeahboyever.mp3'
    )
  } else {
    sayEn('Thank you for subscribing to')
    sayFi('bönthö')
    sayEn('facts.')
  }

  res.writeHead(200, { 'Content-Type': 'text/xml; charset=utf-8' })
  res.end(t.toString())
}

module.exports = async (req, res) =>
  bodyParser(req, res, async () => await main(req, res))
