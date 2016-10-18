export default class Metrix {
  constructor(serverHost) {
    this.serverHost = serverHost
  }

  track() {
    console.log('tracking on', this.serverHost)
  }
}

// TODO: what about staging.. and dev servers.. etc..
let SERVER_HOST = 'http://api.pressly.com/'
if (__DEV__) {
  SERVER_HOST = 'http://localhost:5331/'
}

window.PresslyMetrix = new Metrix(SERVER_HOST)
