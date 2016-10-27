// @flow weak

// TODO: expand on modules which we track events.
const HubModule = 1

class Event {
  constructor(name, data) {
    this.name = name
    this.ts = (new Date()).getTime()
    this.module = HubModule // TODO: change this for other modules.. right now, just hard-coded to hub
    this.url = window.location.href
    this.data = data
  }

  // event json
  json() {
    return {
      ts: this.ts,
      module: this.module,
      url: this.url,
      data: this.data
    }
  }
}

const Tracker = (cb) => {
  return {
    event: (name, data) => {
      const ev = new Event(name, data)
      cb(ev, null)
    },

    // TODO: thoughts around how to have enumerated event names as methods
    pageView: (data) => {
      const ev = new Event('pageView', data)
      cb(ev, null)
    }
  }
}

export default Tracker
