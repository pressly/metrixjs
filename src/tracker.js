// @flow weak

class Event {
  constructor(name, data) {
    this.name = name
    this.ts = (new Date()).getTime()
    this.data = data
  }

  json(base) {
    return { ...base, data: this.data }
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
