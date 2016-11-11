import { Metrix, MetrixNoop } from 'metrix'

// NOTE: apps using metrix.js must set their own server host
let SERVER_HOST
// SERVER_HOST = 'https://staging-api.pressly.com/'
if (__DEV__) {
  SERVER_HOST = 'http://localhost:5331/'
}

let __SSR__ = false

let PMX
if (__SSR__) {
  PMX = new MetrixNoop(SERVER_HOST)
}else {
  PMX = new Metrix(SERVER_HOST)
}
window.PMX = PMX
export { PMX }

// PMX.track.event('USER_PROFILE', 'CREATE', { payload:'goes here' })
// console.log('==> all events:', PMX.track.options)

// NOTE: this will log an error because it doesnt match the proto.js definition
// PMX.track.event('bad', 'CREATE', { payload:'goes here' })

// ACTIONS - below are the combination of actions we have for our simulation
// just add some, and buttons will appear.
//
// Each entry is in the form of: [ <module>, <event>, [ <payload keys to include...> ] ]
//
// Payload keys are grabbed from the default payload values fieldset

export const actions = {
  'Hub page view':      [ 'HUB',              'VIEW',       ['hub_id'] ],
  'Hub page view 2':    [ 'HUB_STREAM',       'VIEW',       ['hub_id'] ],
  'Hub spotlight view': [ 'HUB_SPOTLIGHT',    'VIEW',       ['hub_id', 'post_id'] ]
}
