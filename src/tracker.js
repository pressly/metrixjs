// @flow
import type {JSONData} from './json'

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
  event_type: number
  ts: number
  url: string
  data: JSONData

  constructor(moduleKey: number, eventKey: number, data: JSONData) {
    this.module = moduleKey // module key
    this.event_type = eventKey    // event key

    this.ts = (new Date()).getTime()
    this.url = window.location.href
    this.data = data

    this.verifyKeys()
  }

  verifyKeys():void {
    let k: number = proto.events.Module[this.module]
    if (k == undefined) {
      throw `metrix: ${this.module} is an unsupported module.`
    }
    k = proto.events.Event[this.event_type]
    if (k == undefined) {
      throw `metrix: ${this.event_type} is an unsupported event.`
    }
  }

  // event json
  json(): {ts: number, module: number, event_type: number, url: string, data: JSONData} {
    return {
      ts: this.ts,
      module: this.module,
      event_type: this.event_type,
      url: this.url,
      data: this.data
    }
  }
}
