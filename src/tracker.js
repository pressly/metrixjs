// @flow weak
import { EVENTS } from './events'

const Tracker = (clientID: string, cb) => {
  return {
    pageView: (payload) => {
      let event = {
        name: 'pageView',
        payload: '123'
      }
      let err = ''
      
      cb(event, err)
    }
  }
}

export default Tracker
