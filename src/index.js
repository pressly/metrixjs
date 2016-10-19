// Metrix.js is a user behaviour tracker for Pressly apps. User data is
// transmitted to the Pressly API server, however, it's in fact being
// proxied to the Pressly Metrix web service.
//
// See https://www.optimizesmart.com/google-analytics-cookies-ultimate-guide/
// for a detailed look at how GA cookies works, which is also the basis of this
// implementation. We also implement UTM parameter support, see 

import * as util from './util'
import tracker from './tracker'

const CLIENT_ID_KEY = '_mx'
const CLIENT_ID_EXPIRY = 2*365*24*60 // 2 years in minutes
// const CLIENT_SESSION = ' _mxt'
// const CLIENT_SESSION_EXPIRY = 10 // 10 minutes

const SYNC_INTERVAL = 1000 // in milliseconds

export default class Metrix {
  constructor(serverHost) {

    // api server host
    this.serverHost = serverHost

    // user identity/fingerprint
    this.clientID = this.identify()

    // event queue
    this.queue = []

    // sync enqueued events to the server
    this.sync = util.debounce(this, this.dispatch, SYNC_INTERVAL)
  }

  // identify will find or create a user profile and session cookie
  identify() {
    // Find an existing user identity cookie or create a new one
    let clientID = util.getCookie(CLIENT_ID_KEY)
    if (clientID == '') {
      clientID = util.generateClientID()
    }

    // Always set the user identity cookie, to push forward the expiry
    util.setCookie(CLIENT_ID_KEY, clientID, CLIENT_ID_EXPIRY)
    
    // Track the user session, if it expires, make a new one
    // TODO: ask maciej we need this at all..
    // let session = getCookie(CLIENT_SESSION)
    // if (session == '') {
    //   util.setCookie(CLIENT_SESSION, '1', CLIENT_SESSION_EXPIRY)
    // }

    return clientID
  }

  clearIdentity() {
    if (__DEV__) {
      util.setCookie(CLIENT_ID_KEY, '', 0)
    }
  }

  track(event, payload) {
    console.log('tracking', event, payload)
    let metric = tracker.Track(this.clientID, event, payload)
    this.queue.push(metric)
    this.sync()
  }

  dispatch() {
    if (this.queue.length == 0) return
    console.log('dispatching...', this.queue)
    
    // Copy te payload from the events and empty the queue.
    // NOTE: I guess we dont have to worry about shared state in JS somehow..?
    let payload = [...this.queue]
    this.queue = []

    console.log('payload:', payload, 'queue:', this.queue)

    // TODO HTTP POST it to the server
  }
}

if (typeof fetch === 'undefined') {
  throw 'metrix.js requires fetch(), check your runtime and try again.'
}
