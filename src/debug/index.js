// NOTE: this is a small debug app only compiled while in dev mode.
import { Metrix, MetrixNoop } from 'metrix'

// NOTE: apps using metrix.js must set their own server host
let SERVER_HOST = 'https://staging-api.pressly.com/'
if (__DEV__) {
  // SERVER_HOST = 'http://localhost:5331/'
}

let __SSR__ = false

let PMX
if (__SSR__) {
  PMX = new MetrixNoop(SERVER_HOST)
}else {
  PMX = new Metrix(SERVER_HOST)
}
window.PMX = PMX

PMX.track.event('USER_PROFILE', 'CREATE', { payload:'goes here' })

console.log('==> all events:', PMX.track.options)

// NOTE: this will log an error because it doesnt match the proto.js definition
// PMX.track.event('bad', 'CREATE', { payload:'goes here' })
