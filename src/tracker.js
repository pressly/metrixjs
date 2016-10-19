// @flow weak
import { EVENTS } from './events'

const Tracker = (clientID: string, cb) => {
  return {
    pageView: (payload) => {
      let event = 'pageView'
      let err = ''
      cb(event, payload, err)
    }
  }
}

export default Tracker
