import { PMX, actions } from './app'
import * as util from './util'
const Vue = window.Vue


let fingerprintUI = new Vue({
  el: '#fingerprint',
  data: {
    username: null,
    clientID: null // TODO
  },
  mounted: () => {
    util.getSession().then((res) => {
      fingerprintUI.username = res.username
    })
  }
})

let defaultPayloadValues = new Vue({
  el: '#default-payload-values',
  data: {
    hub_id: '0',
    post_id: '0'
  }
})


// NOTE: im sure there is a better way to generate dynamic templates with vue
// but I don't have time to learn that right now, this works. Vue is very quick
// to use btw, I like it for small stuff.
let actionTemplate = `<div>`
for (let key in actions) {
  actionTemplate += `<button v-on:click="triggerMetric('${key}')">${key}</button><br>`
}
actionTemplate += `</div>`

new Vue({
  el: '#action-buttons',
  data: {
    actions: actions
  },
  template: actionTemplate,
  methods: {
    triggerMetric: (actionKey) => {
      let action = actions[actionKey]
      let moduleKey = action[0]
      let eventKey = action[1]
      let payloadKeys = action[2]
      let payload = {}

      for (let k of payloadKeys) {
        let v = defaultPayloadValues[k]
        if (v !== undefined) {
          payload[k] = v
        }
      }

      PMX.track.event(moduleKey, eventKey, payload)
    }
  }
})
