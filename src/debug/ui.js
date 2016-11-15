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
      org_id: 0,
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
      store.org_id = v
    },
    object_id: function(v) {
      store.object_id = v
      store.feed_id = v
      store.comment_id = v
      store.share_id = v
      store.addon_config_id = v
      store.widget_id = v
      store.invite_id = v
      store.request_id = v
      store.newsletter_id = v
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
      let requiredPayloadFields = action[2]
      let optionalPayloadFields = action[3]
      let extraPayloadValues = action[4]
      let dbTable = action[5]
      let rowNum = 0

      function* generateCombinations(arr) {
        function* doGenerateCombinations(offset, combo) {
          yield combo;
          for (let i = offset; i < arr.length; i++) {
            yield* doGenerateCombinations(i + 1, combo.concat(arr[i]));
          }
        }
        yield* doGenerateCombinations(0, []);
      }

      let eventCount = 1
      for (let i = 0; i < optionalPayloadFields.length; i++) {
        eventCount = 2 * eventCount
      } 

      for (let combo of generateCombinations(optionalPayloadFields)) {
        let payload = {}

        for (let k of requiredPayloadFields) {
          let v = extraPayloadValues[k]
          if (v === undefined) {
            v = store[k]
          }          
          if (v === undefined) {
            console.error('missing required field "' + k + '" value')
            continue            
          }
          payload[k] = v
        }      
        
        rowNum++
      
        for (let k of combo) {          
          let v = extraPayloadValues[k]
          if (v === undefined) {
             v = store[k]
          }
          if (v !== undefined) {
            payload[k] = v
          } else {
            console.warn('undefined optional field "' + k + '" value')
          }
        }

        PMX.track.event(moduleKey, eventKey, payload)
        console.info(JSON.stringify(payload), '=>   SELECT * FROM ' + dbTable + ' ORDER BY ts DESC OFFSET ' + (eventCount - rowNum) + ' LIMIT 1;')
      }
    }
  }
})

new Vue({
  el: '#app'
})
