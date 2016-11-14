import { PMX, actions } from './app'
import * as util from './util'
const Vue = window.Vue

let store = {}

Vue.component('fingerprint', {
  data: function() {
    return {
      username: null,
      cid: null,
      sid: null,
      sqs: null
    }
  },
  mounted: function() {
    let comp = this
    util.getSession().then((res) => {
      comp.username = res.username
    })
    this.cid = window.PMX.clientID
    this.sid = window.PMX.sessionID
    this.sqs = window.PMX.sessionQS
  }
})

Vue.component('default-payload-values', {
  data: function() {
    return {
      hub_id: 0,
      post_id: 0,
      account_id: 0,
      object_id: 0,
      collection_id: 0
    }
  },
  watch: {
    hub_id: function(v) {
      store.hub_id = v
    },
    post_id: function(v) {
      store.post_id = v
    },
    account_id: function(v) {
      store.account_id = v
    },
    object_id: function(v) {
      store.object_id = v
    },
    collection_id: function(v) {
      store.collection_id = v
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
