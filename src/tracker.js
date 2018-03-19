// @flow
/* eslint no-undef: 0 */
import type { JSONData } from './util'

// Import the ./proto.js file while injecting some code to declare the global variables
// in the generated code, as well as export those variables.
let proto = require('exports?proto!imports?goog=>{provide:function(){}},proto=>{events:{}}!./proto.js')

const Tracker: Function = (cb: Function) => {
  return {
    event: (moduleKey: string, sectionKey: string, elementKey:string, eventKey: string, data: JSONData) => {
      const ev = new Event(moduleKey, sectionKey, elementKey, eventKey, data)
      cb(ev, null)
    },

    options: proto.events
  }
}

export default Tracker

export class Event {
  module: string
  section: ?string
  element: ?string
  eventType: string
  ts: Date
  url: ?string
  hub_id: ?string
  post_id: ?string
  account_id: ?string
  object_id: ?string
  data: JSONData

  constructor(moduleKey: string, sectionKey:string, elementKey:string, eventKey: string, data: JSONData) {
    this.module = moduleKey
    this.section = sectionKey
    this.element = elementKey
    this.eventType = eventKey    // event key
    this.ts = new Date()
    this.url = this.getCurrentURL()
    this.data = data

    this.verifyKeys()
  }

  // need this function to make it work on
  getCurrentURL = ():?string => {
    if (typeof window !== 'undefined' &&
        window.location &&
        window.location.href) {
      return window.location.href
    }
    return undefined
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
  json(): JSONData {
    let payload:JSONData = {
      ts: this.ts,
      module: this.module,
      event_type: this.eventType,
      url: this.url
    }
    if (!!this.section) {
      payload.section = this.section
    }
    if (!!this.element) {
      payload.element = this.element
    }

    // Prepare payload data in a particular way for server
    if (!!this.data) {
      if (!!this.data.hub_id) {
        payload.hub_id = this.data.hub_id
        delete this.data.hub_id
      }
      if (!!this.data.post_id) {
        payload.post_id = this.data.post_id
        delete this.data.post_id
      }
      if (!!this.data.account_id) {
        payload.account_id = this.data.account_id
        delete this.data.account_id
      }
      if (!!this.data.org_id) {
        payload.account_id = this.data.org_id
        delete this.data.org_id
      }
      if (!!this.data.object_id) {
        payload.object_id = this.data.object_id
        delete this.data.object_id
      }
      payload.data = this.data
    }

    return payload
  }
}
