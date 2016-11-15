// @flow
/* eslint no-undef: 0 */
import type { JSONData } from './util'

// Import the ./proto.js file while injecting some code to declare the global variables
// in the generated code, as well as export those variables.
let proto = require('exports?proto!imports?goog=>{provide:function(){}},proto=>{events:{}}!./proto.js')

const Tracker: Function = (cb: Function) => {
  return {
    event: (moduleKey: string, eventKey: string, data: JSONData) => {
      const ev = new Event(moduleKey, eventKey, data)
      cb(ev, null)
    },

    options: proto.events
  }
}

export default Tracker

export class Event {
  module: string
  eventType: string
  ts: number
  url: string
  hub_id: number
  post_id: number
  account_id: number
  object_id: number
  data: JSONData

  constructor(moduleKey: string, eventKey: string, data: JSONData) {
    this.module = moduleKey // module key
    this.eventType = eventKey    // event key
    this.ts = new Date()
    this.url = window.location.href
    this.data = data

    this.verifyKeys()
  }

  verifyKeys():void {
    let k: number = proto.events.Module[this.module]
    if (k == undefined) {
      console.error(`metrix: ${this.module} is an unsupported module.`)
    }
    k = proto.events.Event[this.eventType]
    if (k == undefined) {
      console.error(`metrix: ${this.eventType} is an unsupported event.`)
    }
  }

  // event json
  json() {
    let payload = {
      ts: this.ts,
      module: this.module,
      event_type: this.eventType,
      url: this.url
    }

    // Prepare payload data in a particular way for server
    if (this.data.hub_id !== undefined) {
      payload.hub_id = this.data.hub_id
      delete this.data.hub_id
    }
    if (this.data.post_id !== undefined) {
      payload.post_id = this.data.post_id
      delete this.data.post_id
    }
    if (this.data.account_id !== undefined) {
      payload.account_id = this.data.account_id
      delete this.data.account_id
    }
    if (this.data.org_id !== undefined) {
      payload.account_id = this.data.org_id
      delete this.data.org_id
    }
    if (this.data.object_id !== undefined) {
      payload.object_id = this.data.object_id
      delete this.data.object_id
    }
    payload.data = this.data

    return payload
  }
}
