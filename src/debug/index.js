// NOTE: this is a small debug app only compiled while in dev mode.
import Metrix from 'metrix'

// NOTE: apps using metrix.js must set their own server host
let SERVER_HOST = 'http://api.pressly.com/'
if (__DEV__) {
  SERVER_HOST = 'http://localhost:5331/'
}

const PMX = window.PMX = new Metrix(SERVER_HOST)

PMX.track.pageView({ url: 'a' })
PMX.track.pageView({ url: 'b' })

PMX.track.event('someEvent', { x: 123 })
