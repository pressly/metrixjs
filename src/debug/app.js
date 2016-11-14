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
  'Hub: visit a collection': ['HUB_STREAM', 'VIEW', ['collection_id']], // TODO: how do we know collection?

  'Hub: visit team': ['HUB_TEAM', 'VIEW', ['hub_id']],
  'Hub: new member joins': ['HUB_TEAM', '???', []], // TODO
  'Hub: invite new member': ['HUB_TEAM', '???', []], // TODO

  'Hub: update hub settings': ['HUB_SETTINGS', 'UPDATE', ['hub_id']],

  'Hub: create new post': ['HUB', 'CREATE??', ['post_id']], // TODO: correct?
  'Hub: update post': ['HUB', 'UPDATE??', ['post_id']],
  'Hub: delete post': ['HUB', 'DELETE??', ['post_id']],

  'Hub: visit a post': ['HUB_SPOTLIGHT', 'VIEW', ['hub_id','post_id']],

  // Should be sent from pres.ly - in the case of https://pressly.com/salesforce/contenthub
  'Hub: visit an external post from hub stream': ['EXTERNAL', 'VIEW', ['hub_id','post_id']],

  'Hub: share a post from stream': ['HUB_STREAM', 'POST_SHARE', ['hub_id', 'post_id']],
  'Hub: share a post from spotlight': ['HUB_SPOTLIGHT', 'POST_SHARE', ['hub_id', 'post_id']],
  'Hub: schedule a share from spotlight': ['HUB_SPOTLIGHT', 'POST_SHARE???', ['hub_id', 'post_id']], // TODO, prob need POST_SHARE_SCHEDULE

  'Hub: like a post from stream': ['HUB_STREAM', 'POST_LIKE', ['post_id']],
  'Hub: like a post from spotlight': ['HUB_SPOTLIGHT', 'POST_LIKE', ['post_id']],
  'Hub: unlike a post from stream': ['HUB_STREAM', 'POST_UNLIKE', ['post_id']],
  'Hub: unlike a post from spotlight': ['HUB_SPOTLIGHT', 'POST_UNLIKE', ['post_id']],

  'Hub: comment on a post from spotlight': ['HUB_SPOTLIGHT', 'POST_COMMENT', ['post_id']],

  'Hub>Newsletters: create a new newsletter': ['HUB_NEWSLETTERS', 'CREATE', ['hub_id']], // TODO...
  'Hub>Newsletters: send a newsletter': ['HUB_NEWSLETTERS', '???', ['hub_id']], // TODO: object_id?
  'Hub>Newsletters: delete a newsletter': ['HUB_NEWSLETTERS', 'DELETE', ['hub_id']], // TODO: object_id

  'Hub>Feeds: create new feed': ['HUB_FEEDS', 'CREATE', ['hub_id']],
  'Hub>Feeds: view a feed': ['HUB_FEEDS', 'VIEW', ['hub_id']],
  'Hub>Feeds: update a feed': ['HUB_FEEDS', 'UPDATE', ['hub_id']],
  'Hub>Feeds: delete a feed': ['HUB_FEEDS', 'DELETE', ['hub_id']],
  // TODO: we can't actually tell what is the most popular feed source user's query

  'Hub>Analytics: view analytics': ['HUB_ANALYTICS', 'VIEW', ['hub_id']],

  'Hub>Embeds: view embeds': ['HUB_EMBEDS', '????', ['hub_id']],
  'Hub>Embeds: copy snippet stream': ['HUB_EMBEDS', '????', ['hub_id']],
  'Hub>Embeds: copy snippet gallery': ['HUB_EMBEDS', '????', ['hub_id']],
  'Hub>Embeds: copy snippet playlist': ['HUB_EMBEDS', '????', ['hub_id']],

  'Org: view org page': ['ORG_PROFILE', 'VIEW', ['account_id']],
  'Org: edit settings': ['ORG_SETTINGS', 'UPDATE', ['account_id']],
  'Org: view hubs': ['ORG_PROFILE', 'VIEW', []], // TODO: .. how to know they looked at "hubs" tab..?
  'Org: view members': ['ORG_PROFILE', 'VIEW', []], // TODO ...?
  'Org: view posts': ['ORG_PROFILE', 'VIEW', []], // TODO ...? probably need ORG_PROFILE_POSTS etc..

  'User: view org page': ['ORG_PROFILE', 'VIEW', ['account_id']],
  'User: edit settings': ['ORG_SETTINGS', 'UPDATE', ['account_id']],
  'User: view hubs': ['ORG_PROFILE', 'VIEW', []], // TODO: .. how to know they looked at "hubs" tab..?
  'User: view members': ['ORG_PROFILE', 'VIEW', []], // TODO ...?
  'User: view posts': ['ORG_PROFILE', 'VIEW', []], // TODO ...? probably need USER_PROFILE_POSTS etc..

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
