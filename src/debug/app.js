import { Metrix, MetrixNoop } from 'metrix'

// NOTE: apps using metrix.js must set their own server host
let SERVER_HOST
// SERVER_HOST = 'https://staging-api.pressly.com/'
if (__DEV__) {
  SERVER_HOST = 'http://localhost:5331/'
}

let __SSR__ = false

let PMX
if (__SSR__) {
  PMX = new MetrixNoop(SERVER_HOST)
}else {
  PMX = new Metrix(SERVER_HOST)
}
window.PMX = PMX
export { PMX }

// PMX.track.event('USER_PROFILE', 'CREATE', { payload:'goes here' })
// console.log('==> all events:', PMX.track.options)

// NOTE: this will log an error because it doesnt match the proto.js definition
// PMX.track.event('bad', 'CREATE', { payload:'goes here' })

// ACTIONS - below are the combination of actions we have for our simulation
// just add some, and buttons will appear.
//
// Each entry is in the form of: [ <module>, <event>, [ <payload keys to include...> ] ]
//
// Payload keys are grabbed from the default payload values fieldset

export const actions = {
  'Hub: visit hub index': ['HUB', 'VIEW', ['hub_id']],

  'Hub: visit a post': ['HUB_SPOTLIGHT', 'VIEW', ['hub_id','post_id']],

  // Should be sent from pres.ly - in the case of https://pressly.com/salesforce/contenthub
  'Hub: visit an external post from hub stream': ['EXTERNAL', 'VIEW', ['hub_id','post_id']],

  'Hub: visit team': ['HUB_TEAM', 'VIEW', ['hub_id']],

  'Hub: update hub settings': ['HUB_SETTINGS', 'UPDATE', ['hub_id']],

  'Hub: new member joins': ['HUB_TEAM', '???', []],
  'Hub: invite new member': ['HUB_TEAM', '???', []],

  // TODO: is this correct...? 
  // shouldn't it be similar to viewing a post..?
  'Hub: create new post': ['HUB', 'CREATE??', ['post_id']],
  'Hub: update post': ['HUB', 'UPDATE??', ['post_id']],
  'Hub: delete post': ['HUB', 'DELETE??', ['post_id']],

  'Hub: share a post from stream': ['HUB_STREAM', 'POST_SHARE', ['hub_id', 'post_id']],
  'Hub: share a post from spotlight': ['HUB_SPOTLIGHT', 'POST_SHARE', ['hub_id', 'post_id']],

  'Hub: like a post from stream': ['HUB_STREAM', 'POST_LIKE', ['post_id']],
  'Hub: like a post from spotlight': ['HUB_SPOTLIGHT', 'POST_LIKE', ['post_id']],
  'Hub: unlike a post from stream': ['HUB_STREAM', 'POST_UNLIKE', ['post_id']],
  'Hub: unlike a post from spotlight': ['HUB_SPOTLIGHT', 'POST_UNLIKE', ['post_id']],

  'Hub: comment on a post from spotlight': ['HUB_SPOTLIGHT', 'POST_COMMENT', ['post_id']],



  // *** TODO ***
  // 'Hub: visit a collection': ['HUB_STREAM', 'VIEW', ['collection_id']]

  // TODO: we don't actually know which social provider was most effective..
  'Login via Password FAIL': ['LOGIN', 'PASSWORD_LOGIN_FAIL', []],
  'Login via Password OK': ['LOGIN', 'PASSWORD_LOGIN_OK', []],
  'Login via SSO FAIL': ['LOGIN', 'SSO_LOGIN_FAIL', []],
  'Login via SSO OK': ['LOGIN', 'SSO_LOGIN_OK', []],
  'Login via Social FAIL': ['LOGIN', 'SOCIAL_LOGIN_FAIL', []],
  'Login via Social OK': ['LOGIN', 'SOCIAL_LOGIN_OK', []],
  
  // TODO: useful to understand the completion / incompletion of signups..
  'Signup: screen 1': ['SIGNUP', '???', []],
  'Signup: screen 2': ['SIGNUP', '???', []],
  'Signup: complete': ['SIGNUP', '???', []],

  'Feed: visit index': ['FEED', 'VIEW', []]
}
