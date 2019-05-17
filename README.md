# stupidhack19-twilio

https://stupidhack19-twilio.cxcorp.now.sh

## Endpoints

#### `GET /api/twiml/come-bontho?name=foo&place=bar`

Serves the TwiML for making the initial call. Customize `name` and `place`.
Responds with `Content-Type: text/xml; charset=utf-8`

#### `POST /api/twiml/come-bontho-callback`

Serves the `gather` action response to `/come-bontho`.

Expects `Content-Type: application/x-www-form-urlencoded`.
Responds with `Content-Type: text/xml; charset=utf-8`

```
POST /api/twiml/come-bontho-callback

Digits=1
```

## How to use

Create Twilio account, follow starter guides and choose your phone number, then go to the Twilio Console to get your SID and api token, then:

```js
const twilio = require('twilio')
const client = twilio('<sid here>', '<token here>')

const twilioNumber = '<your twilio number here>'
const targetNumber = '<phone number to call in E.164 format, e.g. +358401234567>'
const name = "Petteri"
const place = "Startup Sauna"

client.calls
  .create({
    url: `https://stupidhack19-twilio.cxcorp.now.sh/api/twiml/come-bontho?name=${encodeURIComponent(name)}&place=${encodeURIComponent(place)}`,
    to: targetNumber,
    from: twilioNumber
  })
  .then(call => {
    console.log(call)
    console.log('Call enqueued')
  })
  .catch(e => console.error('error', e))
```

## License

MIT
