import { PMX, actions } from './app'
import * as util from './util'
const Vue = window.Vue

let store = {}

Vue.component('fingerprint', {
  data: function() {
    return {
      username: null,
      clientID: null
    }
  },
  mounted: function() {
    let comp = this
    util.getSession().then((res) => {
      comp.username = res.username
    })
  }
})

Vue.component('default-payload-values', {
  data: function() {
    return {
      hub_id: '0',
      post_id: '0'
    }
  },
  watch: {
    hub_id: function(v) {
      store.hub_id = v
    },
    post_id: function(v) {
      store.post_id = v
    }
  }
})

Vue.component('actions', {
  data: function() {
    return {
      actions: actions
    }
  },
  methods: {
    triggerMetric: function(actionKey) {
      let action = actions[actionKey]
      let moduleKey = action[0]
      let eventKey = action[1]
      let payloadKeys = action[2]
      let payload = {}

      for (let k of payloadKeys) {
        let v = store[k]
        if (v !== undefined) {
          payload[k] = v
        }
      }

      PMX.track.event(moduleKey, eventKey, payload)
    }
  }
})

new Vue({
  el: '#app'
})
