// @flow

// Metrix.js is a user behaviour tracker for Pressly apps. User data is
// transmitted to the Pressly API server, however, it's in fact being
// proxied to the Pressly Metrix web service.
//
// See https://www.optimizesmart.com/google-analytics-cookies-ultimate-guide/
// for a detailed look at how GA cookies works, which is also the basis of this
// implementation. We also implement UTM parameter support, see

import * as util from './util'
import Tracker from './tracker'
import type { Event } from './tracker'
import Storage from './storage'

// Request path to POST event payloads on the server
const SERVER_ENDPOINT: string = '/metrix'

// Long-term persisted client id fingerprint
const CLIENT_ID_KEY: string = '_pmx'
const CLIENT_ID_EXPIRY: number = 2*365*24*60 // 2 years in minutes

// Short-lived cookie to identify a single visit from a client.
// The session ID is actually the unix timestamp of the session start time.
const SESSION_ID_KEY: string = '_pmxb'
const SESSION_ID_EXPIRY: number = 15 // 15 minutes

// Short-lived query string stored in the cookie in case a user removes
// them from the url. We do this to persist UTM query params, as well
// other potential query params we want to look out for. This cookie works
// in coordination with the session cookie above.
const SESSION_QS_KEY: string = '_pmxz'
const SESSION_QS_EXPIRY: number = SESSION_ID_EXPIRY

const SESSION_REF_KEY: string = '_pmxr'

// Amount of time given to batch work
const DISPATCH_INTERVAL: number = 100 // 100 milliseconds
const IDENTIFY_INTERVAL: number = 1*60*1000 // 1 minute in milliseconds

// TODO: grab the client id from the query param if its there
// check to make sure it has a . and X length..
// set the cookie value (with presedence)
//
// TODO: use history API to remove the cid query param
//
// TODO: should we send an event every minute...? something about
// a PING ..? but, we'll have to track the last module of the event
// we sent, which tells us the last place they were, and maybe payload..?
//
// TODO: record/dispatch the app version with each payload, this will help
// us understand blue-suede vs mobile vs embed, etc..

// Metrix is the core interface to identifying, tracking and dispatching
// user behaviour events.
export class Metrix {
  serverHost: string
  appVersion: string
  authToken: ?string
  metrixURL: string
  timezoneOffset: number
  track: Function
  sync: Function
  queue: Array<Event>
  clientID: string
  sessionID: string
  sessionQS: string
  referrer: string
  storage: Storage
  intervalHandler: number

  constructor(serverHost: string, appVersion: string, authToken: ?string, storage: ?Storage) {
    if (typeof window !== 'undefined' && typeof window.fetch === 'undefined') {
      throw 'metrix.js requires fetch(), check your runtime and try again.'
    }

    // if storage is not being passed then, it uses the default storage
    if (!storage) {
      storage = new Storage()
    }
    this.storage = storage

    // api server host
    this.serverHost = serverHost.replace(/\/$/, '')
    this.metrixURL = `${this.serverHost}${SERVER_ENDPOINT}`

    this.appVersion = appVersion
    if (appVersion == '') {
      console.error('metrix: appVersion is required.')
    }

    // User auth token, used by mobile app. When null, the value will rely on cookie
    // to send the information.
    this.authToken = authToken

    // Identify the user with a long and short lived fingerprint.
    // As well, setup an interval to update the identity while a
    // session is active.
    this.identify()
    this.intervalHandler = setInterval(this.identify, IDENTIFY_INTERVAL)

    // track the client's timezone offset
    this.timezoneOffset = (new Date()).getTimezoneOffset()

    // setup tracker methods for the client
    this.track = Tracker(this.enqueue)

    // sync enqueued events to the server
    this.sync = util.debounce(this.dispatch, DISPATCH_INTERVAL)

    // event queue
    this.queue = []
  }

  // in mobile, we need to clear out the setInterval everytime we create a new
  // metrix.
  cleanUp = () => {
    clearInterval(this.intervalHandler)
    this.intervalHandler = 0
  }

  // identify will find, create or update the user identity cookies.
  identify: Function = async () => {
    let cookieVals: {[id:string]: string} = await this.storage.getCookies([ CLIENT_ID_KEY, SESSION_ID_KEY, SESSION_QS_KEY, SESSION_REF_KEY ])

    // Find an existing user identity cookie or create a new one.
    // Also, always update the expiry for the client id cookie.
    let clientID: string = cookieVals[CLIENT_ID_KEY]
    if (clientID == '') {
      clientID = util.generateUID()
    }
    await this.storage.setCookie(CLIENT_ID_KEY, clientID, CLIENT_ID_EXPIRY)

    // Track the user session, if it expires, make a new one.
    // Also, always update the expiry for the session id cookie.
    let sessionID: string = cookieVals[SESSION_ID_KEY]
    if (sessionID == '') {
      sessionID = util.generateUID()
    }
    await this.storage.setCookie(SESSION_ID_KEY, sessionID, SESSION_ID_EXPIRY)

    // Track the session QS (Query String), this will have utm params
    // that are important to report. We store them in a cookie for the
    // session lifetime in case the qs changes during the session.
    let sessionQS: string = cookieVals[SESSION_QS_KEY]
    if (sessionQS == '') {
      sessionQS = window.location.search.substr(1)
    }
    await this.storage.setCookie(SESSION_QS_KEY, sessionQS, SESSION_QS_EXPIRY)

    let referrer: string = cookieVals[SESSION_REF_KEY]
    if (referrer == '') {
      referrer = document.referrer
    }
    await this.storage.setCookie(SESSION_REF_KEY, referrer, SESSION_QS_EXPIRY)

    util.log('clientID:', clientID)

    this.clientID = clientID
    this.sessionID = sessionID
    this.sessionQS = sessionQS
    this.referrer = referrer
  }

  async clearIdentity() {
    if (__DEV__) {
      await this.storage.setCookie(CLIENT_ID_KEY, '', 0)
      await this.storage.setCookie(SESSION_ID_KEY, '', 0)
      await this.storage.setCookie(SESSION_QS_KEY, '', 0)
    }
  }

  enqueue = (event: Event) => {
    util.log('tracking', event)
    this.queue.push(event)
    this.sync()
  }

  dispatch = () => {
    if (this.queue.length == 0) return

    // payload setup for our batch of events
    const payload = {
      v: this.appVersion,
      cid: this.clientID,
      sid: this.sessionID,
      sqs: this.sessionQS,
      tzo: this.timezoneOffset,
      referrer: this.referrer,
      events: []
    }

    // push the events into the payload and clear the queue
    for (let i=0; i < this.queue.length; i++) {
      const ev = this.queue[i]
      payload.events.push(ev.json())
    }
    this.queue = []

    // Send the payload over to the metrix endpoint
    util.log('post to server:', payload)

    let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })

    if (this.authToken != null && this.authToken != '') {
      headers.append('Authorization', `BEARER ${this.authToken}`)
    }

    fetch(this.metrixURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: headers,
      body: JSON.stringify(payload)
    }).then((resp) => {
      if (resp.status !== 204) { // 204 SUCCESS will not send a json response payload
        return resp.json()
      }
    }).then((result) => {
      util.log('metrix dispatch response:', result)
    }).catch((err) => {
      console.error('metrix:', err)
    })
  }
}

export class MetrixNoop {
  track: {}
  constructor() {
    this.track = new Proxy({}, {
      get: (target, name) => {
        return () => {}
      }
    })
  }
}
