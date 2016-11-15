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
  PMX = new MetrixNoop(SERVER_HOST, 'webapp-v4.6.0')
}else {
  PMX = new Metrix(SERVER_HOST, 'webapp-v4.6.0')
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
/*
{
  "key": [
    'LOGIN',              // module
    'SOCIAL_LOGIN_FAIL',  // event
    ['network'],          // required fields (from both "standard" and extra)
    ['hub_id', 'org_id'], // optional fields (from both "standard" and extra)
    {"key": val},         // example values of the non-standard, extra fields
    'post_events',        // table in which the data will be stored - to generate testing query
    'comment',            // extra information
  ]
}
*/

export const actions = {
  'Login: view login page':['LOGIN', 'VIEW', [],['hub_id', 'org_id'], {}, 'events', 'set org_id when on custom login page, set hub_id when logging in while on a hub'],
  'Login: password login fail':['LOGIN', 'PASSWORD_LOGIN_FAIL', [],['hub_id', 'org_id'], {}, 'events', 'set org_id when on custom login page, set hub_id when logging in while on a hub'],
  'Login: password login success':['LOGIN', 'PASSWORD_LOGIN_OK', [],['hub_id', 'org_id'], {}, 'events', 'set org_id when on custom login page, set hub_id when logging in while on a hub'],  
  'Login: SSO login fail':['LOGIN', 'SSO_LOGIN_FAIL', ['object_id'],['hub_id', 'org_id'], {}, 'events', 'object_id should be set to sso_config.id, set org_id when on custom login page, set hub_id when logging in while on a hub'],
  'Login: SSO login success':['LOGIN', 'SSO_LOGIN_OK', ['object_id'],['hub_id', 'org_id'], {}, 'events', 'object_id should be set to sso_config.id, set org_id when on custom login page, set hub_id when logging in while on a hub'],  
  'Login: social login fail':['LOGIN', 'SOCIAL_LOGIN_FAIL', ['network'],['hub_id', 'org_id'], {'network': 'facebook'}, 'events', 'set org_id when on custom login page, set hub_id when logging in while on a hub'],
  'Login: social login success':['LOGIN', 'SOCIAL_LOGIN_OK', ['network'],['hub_id', 'org_id'], {'network': 'facebook'}, 'events', 'set org_id when on custom login page, set hub_id when logging in while on a hub'],

  'Hub: create a hub':['HUB', 'CREATE', ["hub_id"], [], {}, 'events', ''],
  'Hub: delete a hub':['HUB', 'DELETE', ["hub_id"], [], {}, 'events', ''],
  'Hub: update a hub':['HUB', 'UPDATE', ["hub_id"], [], {}, 'events', ''],

  'Hub stream: view hub stream':['HUB_STREAM', 'VIEW', ["hub_id"],[], {}, 'post_events', ''],
  'Hub stream: view hub collection stream':['HUB_STREAM', 'VIEW', ["hub_id", "collection_id"],[], {}, 'post_events', ''],
  'Hub stream: view hub tag stream':['HUB_STREAM', 'VIEW', ["hub_id", "tags"],[], {'tags': ['my-tag']}, 'post_events', 'tag has to be passed as a single element tags array'],
  'Hub stream: view hub author stream':['HUB_STREAM', 'VIEW', ["hub_id", "account_id"],[], {}, 'post_events', 'set account_id to author.id'],
  'Hub stream: click on post':['HUB_STREAM', 'OPEN', ["hub_id", "post_id"],[], {}, 'post_events', ''],
  'Hub stream: like post':['HUB_STREAM', 'POST_LIKE', ["hub_id", "post_id"],[], {}, 'post_events', ''],
  'Hub stream: unlike post':['HUB_STREAM', 'POST_UNLIKE', ["hub_id", "post_id"],[], {}, 'post_events', ''],
  'Hub stream: comment post':['HUB_STREAM', 'POST_COMMENT', ["hub_id", "post_id", 'object_id'],[], {}, 'post_events', 'set object_id to the id of the comment'],
  'Hub stream: delete post comment':['HUB_STREAM', 'POST_COMMENT_DELETE', ["hub_id", "post_id", 'object_id'],[], {}, 'post_events', 'set object_id to the id of the comment'],
  'Hub stream: post share':['HUB_STREAM', 'POST_SHARE', ["hub_id", "post_id", 'object_id', 'network'],[], {'network': 'twitter'}, 'post_events', 'set object_id to the id of the share'],
  'Hub stream: schedule post share':['HUB_STREAM', 'POST_SHARE_SCHEDULE', ["hub_id", "post_id", 'object_id', 'network'],[], {'network': 'twitter'}, 'post_events', 'set object_id to the id of the share'],

  'Hub spotlight: view post':['HUB_SPOTLIGHT', 'VIEW', ['post_id'], ['collection_id', 'tags', 'account_id'], {'tags': ['my-tag1', 'my-tag2']}, 'post_events', ''],
  'Hub spotlight: like post':['HUB_SPOTLIGHT', 'POST_LIKE', ["hub_id", "post_id"],[], {}, 'post_events', ''],
  'Hub spotlight: unlike post':['HUB_SPOTLIGHT', 'POST_UNLIKE', ["hub_id", "post_id"],[], {}, 'post_events', ''],
  'Hub spotlight: comment post':['HUB_SPOTLIGHT', 'POST_COMMENT', ["hub_id", "post_id", 'object_id'],[], {}, 'post_events', 'set object_id to the id of the comment'],
  'Hub spotlight: delete post comment':['HUB_SPOTLIGHT', 'POST_COMMENT_DELETE', ["hub_id", "post_id", 'object_id'],[], {}, 'post_events', 'set object_id to the id of the comment'],
  'Hub spotlight: post share':['HUB_SPOTLIGHT', 'POST_SHARE', ["hub_id", "post_id", 'object_id', 'network'],[], {'network': 'twitter'}, 'post_events', 'set object_id to the id of the share'],
  'Hub spotlight: schedule post share':['HUB_SPOTLIGHT', 'POST_SHARE_SCHEDULE', ["hub_id", "post_id", 'object_id', 'network'],[], {'network': 'twitter'}, 'post_events', 'set object_id to the id of the share'],  
  /*'Hub: visit hub index': ['HUB', 'VIEW', ['hub_id']],
  'Hub: visit a collection': ['HUB_STREAM', 'VIEW', ['hub_id', 'collection_id']],

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

  'Feed: visit index': ['FEED', 'VIEW', []]*/
}
