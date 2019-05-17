# stupidhack19-twilio

https://stupidhack19-twilio.cxcorp.now.sh

### Endpoints

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

## License

MIT
