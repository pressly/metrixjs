// NOTE: this is a small debug app only compiled while in dev mode.
import { Metrix, MetrixNoop } from 'metrix'

// NOTE: apps using metrix.js must set their own server host
let SERVER_HOST = 'http://api.pressly.com/'
if (__DEV__) {
  SERVER_HOST = 'http://localhost:5331/'
}

let __SSR__ = true

let PMX
if (__SSR__) {
  PMX = new MetrixNoop(SERVER_HOST)
}else {
  PMX = new Metrix(SERVER_HOST)
}
window.PMX = PMX

// TODO, track..
/*
- ClientID
- SessionID
- SessionQS

[]events:
- Module (id) - Hub ***
- HubID
*/

PMX.track.pageView({ url: 'a' })
PMX.track.pageView({ url: 'b' })

PMX.track.event('someEvent', { x: 123 })
