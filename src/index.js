// Metrix.js is a user behaviour tracker for Pressly apps. User data is
// transmitted to the Pressly API server, however, it's in fact being
// proxied to the Pressly Metrix web service.
//
// See https://www.optimizesmart.com/google-analytics-cookies-ultimate-guide/
// for a detailed look at how GA cookies works, which is also the basis of this
// implementation. We also implement UTM parameter support, see 

import * as util from './util'
import Tracker from './tracker'

// Request path to POST event payloads on the server
const SERVER_ENDPOINT = '/metrix'

// Long-term persisted client id fingerprint
const CLIENT_ID_KEY = '_pmx'
const CLIENT_ID_EXPIRY = 2*365*24*60 // 2 years in minutes

// Short-lived cookie to identify a single visit from a client.
// The session ID is actually the unix timestamp of the session start time.
const SESSION_ID_KEY = '_pmxb'
const SESSION_ID_EXPIRY = 15 // 15 minutes

// Short-lived query string stored in the cookie in case a user removes
// them from the url. We do this to persist UTM query params, as well 
// other potential query params we want to look out for. This cookie works
// in coordination with the session cookie above.
const SESSION_QS_KEY = '_pmxz'
const SESSION_QS_EXPIRY = SESSION_ID_EXPIRY

// Amount of time given to batch work
const DISPATCH_INTERVAL = 100 // 100 milliseconds
const IDENTIFY_INTERVAL = 1*60*1000 // 1 minute in milliseconds

// ****TODO****
// should we be setting the domain for the cookie? to make sure
// on *.domain.com we use the same clientid

// Metrix is the core interface to identifying, tracking and dispatching
// user behaviour events.
export default class Metrix {
  constructor(serverHost) {

    // api server host
    this.serverHost = serverHost.replace(/\/$/, '')
    this.metrixURL = `${this.serverHost}${SERVER_ENDPOINT}`

    // Identify the user with a long and short lived fingerprint.
    // As well, setup an interval to update the identity while a
    // session is active.
    this.identify()
    setInterval(this.identify, IDENTIFY_INTERVAL)

    // setup tracker methods for the client
    this.track = Tracker(this.enqueue)

    // sync enqueued events to the server
    this.sync = util.debounce(this.dispatch, DISPATCH_INTERVAL)

    // event queue
    this.queue = []
  }

  // identify will find, create or update the user identity cookies.
  identify = () => {

    let cookieVals = util.getCookies([ CLIENT_ID_KEY, SESSION_ID_KEY, SESSION_QS_KEY ])

    // Find an existing user identity cookie or create a new one.
    // Also, always update the expiry for the client id cookie.
    let clientID = cookieVals[CLIENT_ID_KEY]
    if (clientID == '') {
      clientID = util.generateUID()
    }
    util.setCookie(CLIENT_ID_KEY, clientID, CLIENT_ID_EXPIRY)
    
    // Track the user session, if it expires, make a new one.
    // Also, always update the expiry for the session id cookie.
    let sessionID = cookieVals[SESSION_ID_KEY]
    if (sessionID == '') {
      sessionID = util.generateUID()
    }
    util.setCookie(SESSION_ID_KEY, sessionID, SESSION_ID_EXPIRY)

    // Track the session QS (Query String), this will have utm params
    // that are important to report. We store them in a cookie for the
    // session lifetime in case the qs changes during the session.
    let sessionQS = cookieVals[SESSION_QS_KEY]
    if (sessionQS == '') {
      sessionQS = window.location.search.substr(1)
    }
    util.setCookie(SESSION_QS_KEY, sessionQS, SESSION_QS_EXPIRY)

    this.clientID = clientID
    this.sessionID = sessionID
    this.sessionQS = sessionQS
  }

  clearIdentity() {
    if (__DEV__) {
      util.setCookie(CLIENT_ID_KEY, '', 0)
      util.setCookie(SESSION_ID_KEY, '', 0)
      util.setCookie(SESSION_QS_KEY, '', 0)
    }
  }

  enqueue = (event, err) => {
    util.log('tracking', event)
    this.queue.push(event)
    this.sync()
  }

  dispatch = () => {
    if (this.queue.length == 0) return
    util.log('dispatching...', this.queue)
    
    // payload setup for our batch of events
    const payload = {
      cid: this.clientID,
      sid: this.sessionID,
      sqs: this.sessionQS,
      events: []
    }

    // push the events into the payload and clear the queue
    for (let i=0; i < this.queue.length; i++) {
      const ev = this.queue[i]
      payload.events.push(ev.json())
    }
    this.queue = []

    // Send the payload over to the metrix endpoint
    fetch(this.metrixURL, {
      method: 'post',
      mode: 'cors',
      credentials: 'include',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(payload)
    }).then((resp) => {
      return resp.json()
    }).then((result) => {
      util.log('metrix dispatch response:', result)
    }).catch((err) => {
      console.error('metrix:', err)
    })
  }
}

if (typeof window.fetch === 'undefined') {
  throw 'metrix.js requires fetch(), check your runtime and try again.'
}
