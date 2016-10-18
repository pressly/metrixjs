// Metrix.js is a user behaviour tracker for Pressly apps. User data is
// transmitted to the Pressly API server, however, it's in fact being
// proxied to the Pressly Metrix web service.
//
// See https://www.optimizesmart.com/google-analytics-cookies-ultimate-guide/
// for a detailed look at how GA cookies works, which is also the basis of this
// implementation. We also implement UTM parameter support, see 

const USER_IDENTITY = '_mx'
const USER_VISIT = ' _mxt'

export default class Metrix {
  constructor(serverHost) {
    this.serverHost = serverHost
  }

  track(event, payload) {
    console.log('tracking', event, payload)
  }
}

// 1. We start by creating or find a user fingerprint + visit
// effectively, this is the constructor.. and it should be on the current
// domain/host.
//
// 
//
// TODO: createUser() - aka creates the user fingerprint 
// and session hash
// the cookies should be set on the very top-level domain.
// MX1.2.<rand>.<created_at>
// clientID = '<rand>.<created_at>'
//
// 2. 
// ...
//
// X. track() events and queue them. The api.pressly.com receiving
// server will notice the auth header or cookie, and it should keep
// that into consideration on its own. We wouldn't know the jwt and
// we dont want to assume we know the user id because that can be faked.
//
// Z. every 100ms, send() the queued events as a batch



// TODO: what about staging.. and dev servers.. etc..
let SERVER_HOST = 'http://api.pressly.com/'
if (__DEV__) {
  SERVER_HOST = 'http://localhost:5331/'
}

window.PresslyMetrix = new Metrix(SERVER_HOST)
