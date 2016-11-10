// @flow weak

let proto = require('exports?proto!imports?goog=>{provide:function(){}},proto=>{events:{}}!./proto.js')

const Tracker = (cb) => {
  return {
    event: (moduleKey, eventKey, data) => {
      const ev = new Event(moduleKey, eventKey, data)
      cb(ev, null)
    },

    options: proto.events
  }
}

export default Tracker

class Event {
  constructor(moduleKey, eventKey, data) {
    this.module = moduleKey // module key
    this.event_type = eventKey    // event key

    this.ts = (new Date()).getTime()
    this.url = window.location.href
    this.data = data

    this.verifyKeys()
  }

  verifyKeys() {
    let k = proto.events.Module[this.module]
    if (k == undefined) {
      throw `metrix: ${this.module} is an unsupported module.`
    }
    k = proto.events.Event[this.event_type]
    if (k == undefined) {
      throw `metrix: ${this.event_type} is an unsupported event.`
    }
  }

  // event json
  json() {
    return {
      ts: this.ts,
      module: this.module,
      event_type: this.event_type,
      url: this.url,
      data: this.data
    }
  }
}
