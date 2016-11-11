// @flow
/* eslint no-undef: 0 */
import type {JSONData} from './json'

// Import the ./proto.js file while injecting some code to declare the global variables
// in the generated code, as well as export those variables.
let proto = require('exports?proto!imports?goog=>{provide:function(){}},proto=>{events:{}}!./proto.js')

const Tracker: Function = (cb: Function) => {
  return {
    event: (moduleKey, eventKey, data) => {
      const ev = new Event(moduleKey, eventKey, data)
      cb(ev, null)
    },

    options: proto.events
  }
}

export default Tracker

export class Event {
  module: number
  eventType: number
  ts: number
  url: string
  data: JSONData

  constructor(moduleKey: number, eventKey: number, data: JSONData) {
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
  json(): {ts: number, module: number, event_type: number, url: string, data: JSONData} {
    return {
      ts: this.ts,
      module: this.module,
      event_type: this.eventType,
      url: this.url,
      data: this.data
    }
  }
}
