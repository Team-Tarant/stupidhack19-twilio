const axios = require('axios')
const BodyParser = require('body-parser')
const { VoiceResponse } = require('twilio').twiml

const { BACKEND_URL, BACKEND_API_KEY } = process.env

const bodyParser = BodyParser.urlencoded({ extended: false })

/**
 *
 * @param {boolean} isDown
 * @returns {Promise<any>}
 */
const postResponse = (sid, number, isDown) =>
  axios.request({
    method: 'POST',
    url: `${BACKEND_URL}/api/response`,
    params: {
      api_key: BACKEND_API_KEY
    },
    data: {
      isDown,
      sid,
      number
    }
  })

const main = async (req, res) => {
  const t = new VoiceResponse()
  const sayEn = msg => t.say({ voice: 'Polly.Joey' }, msg)
  const sayFi = msg => t.say({ language: 'fi-FI' }, msg)

  const { Digits, CallSid, To } = req.body
  const isDown = Digits === '1'

  await postResponse(CallSid, To, isDown)

  if (isDown) {
    t.play(
      {
        loop: 1
      },
      'https://www.myinstants.com/media/sounds/mylongestyeahboyever.mp3'
    )
  } else {
    sayEn('Vittu!!!')
  }

  res.writeHead(200, { 'Content-Type': 'text/xml; charset=utf-8' })
  res.end(t.toString())
}

module.exports = async (req, res) =>
  bodyParser(req, res, async () => await main(req, res))
