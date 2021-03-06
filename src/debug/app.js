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
  PMX = new MetrixNoop(SERVER_HOST, 'webapp-v4.6.0', null)
}else {
  PMX = new Metrix(SERVER_HOST, 'webapp-v4.6.0', null)
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
  'key': [
    'HUB',                  // module
    'SPOTLIGHT',            // section
    '',                     // element
    'POST_LIKE',            // event
    ['hub__id', 'post_id'], // required fields (from both 'standard' and extra)
    ['hub_id', 'org_id'],   // optional fields (from both 'standard' and extra)
    {'key': val},           // example values of the non-standard, extra fields
    'post_events',          // table in which the data will be stored - to generate testing query
    'my comment',           // extra information about payload
  ]
}
*/

export const actions = {
  'Login: view login page': ['LOGIN', '', '', 'VIEW', [],['hub_id', 'org_id'], {}, 'events', 'set org_id when on custom login page, set hub_id when logging in while on a hub'],
  'Login: password login fail':['LOGIN', 'PASSWORD', '', 'LOGIN_FAIL', [],['hub_id', 'org_id'], {}, 'events', 'set org_id when on custom login page, set hub_id when logging in while on a hub'],
  'Login: password login success':['LOGIN', 'PASSWORD', '', 'LOGIN_OK', [],['hub_id', 'org_id'], {}, 'events', 'set org_id when on custom login page, set hub_id when logging in while on a hub'],
  'Login: SSO login fail':['LOGIN', 'SSO', '', 'LOGIN_FAIL', ['sso_config_id'],['hub_id', 'org_id'], {}, 'events', 'set org_id when on custom login page, set hub_id when logging in while on a hub'],
  'Login: SSO login success':['LOGIN', 'SSO', '', 'LOGIN_OK', ['sso_config_id'],['hub_id', 'org_id'], {}, 'events', 'set org_id when on custom login page, set hub_id when logging in while on a hub'],
  'Login: social login fail':['LOGIN', 'SOCIAL', '', 'LOGIN_FAIL', ['network'],['hub_id', 'org_id'], {'network': 'facebook'}, 'events', 'set org_id when on custom login page, set hub_id when logging in while on a hub'],
  'Login: social login success':['LOGIN', 'SOCIAL', '', 'LOGIN_OK', ['network'],['hub_id', 'org_id'], {'network': 'facebook'}, 'events', 'set org_id when on custom login page, set hub_id when logging in while on a hub'],

  'Feed: view feed':['FEED', '', '', 'VIEW', [],[], {}, 'events', ''],
  'Feed: open post':['FEED', '', '', 'OPEN', ['post_id'],[], {}, 'events', ''],
  'Feed: open hub':['FEED', '', '', 'OPEN', ['hub_id'],[], {}, 'events', ''],
  'Feed: open hub collection':['FEED', '', '', 'OPEN', ['hub_id', 'collection_id'],[], {}, 'post_events', ''],
  'Feed: like post':['FEED', '', '', 'POST_LIKE', ['hub_id', 'post_id'],[], {}, 'post_events', ''],
  'Feed: unlike post':['FEED', '', '', 'POST_UNLIKE', ['hub_id', 'post_id'],[], {}, 'post_events', ''],
  'Feed: comment post':['FEED', '', '', 'POST_COMMENT', ['hub_id', 'post_id', 'comment_id'],[], {}, 'post_events', ''],
  'Feed: delete post comment':['FEED', '', '', 'POST_COMMENT_DELETE', ['hub_id', 'post_id', 'comment_id'],[], {}, 'post_events', ''],
  'Feed: post share':['FEED', '', '', 'POST_SHARE', ['hub_id', 'post_id', 'share_id', 'network'],[], {'network': 'twitter'}, 'post_events', ''],
  'Feed: schedule post share':['FEED', '', '', 'POST_SHARE_SCHEDULE', ['hub_id', 'post_id', 'share_id', 'network'],[], {'network': 'twitter'}, 'post_events', ''],

  'Hub stream: view hub index':['HUB', 'STREAM', '', 'VIEW', ['hub_id'],[], {}, 'post_events', ''],
  'Hub stream: view hub collection stream':['HUB', 'STREAM', '', 'VIEW', ['hub_id', 'collection_id'],[], {}, 'post_events', ''],
  'Hub stream: view hub tag stream':['HUB', 'STREAM', '', 'VIEW', ['hub_id', 'tags'],[], {'tags': ['my-tag']}, 'post_events', 'tag has to be passed as a single element tags array'],
  'Hub stream: view hub author stream':['HUB', 'STREAM', '', 'VIEW', ['hub_id', 'account_id'],[], {}, 'post_events', 'set account_id to author.id'],
  'Hub stream: open post':['HUB', 'STREAM', '', 'OPEN', ['hub_id', 'post_id'],[], {}, 'post_events', ''],
  'Hub stream: like post':['HUB', 'STREAM', '', 'POST_LIKE', ['hub_id', 'post_id'],[], {}, 'post_events', ''],
  'Hub stream: unlike post':['HUB', 'STREAM', '', 'POST_UNLIKE', ['hub_id', 'post_id'],[], {}, 'post_events', ''],
  'Hub stream: comment post':['HUB', 'STREAM', '', 'POST_COMMENT', ['hub_id', 'post_id', 'comment_id'],[], {}, 'post_events', ''],
  'Hub stream: delete post comment':['HUB', 'STREAM', '', 'POST_COMMENT_DELETE', ['hub_id', 'post_id', 'comment_id'],[], {}, 'post_events', ''],
  'Hub stream: post share':['HUB', 'STREAM', '', 'POST_SHARE', ['hub_id', 'post_id', 'share_id', 'network'],[], {'network': 'twitter'}, 'post_events', ''],
  'Hub stream: schedule post share':['HUB', 'STREAM', '', 'POST_SHARE_SCHEDULE', ['hub_id', 'post_id', 'share_id', 'network'],[], {'network': 'twitter'}, 'post_events', ''],

  'Hub spotlight: view post':['HUB', 'SPOTLIGHT', '', 'VIEW', ['post_id'], ['collection_id', 'tags', 'account_id'], {'tags': ['my-tag1', 'my-tag2']}, 'post_events', ''],
  'Hub spotlight: like post':['HUB', 'SPOTLIGHT', '', 'POST_LIKE', ['hub_id', 'post_id'],[], {}, 'post_events', ''],
  'Hub spotlight: unlike post':['HUB', 'SPOTLIGHT', '', 'POST_UNLIKE', ['hub_id', 'post_id'],[], {}, 'post_events', ''],
  'Hub spotlight: comment post':['HUB', 'SPOTLIGHT', '', 'POST_COMMENT', ['hub_id', 'post_id', 'comment_id'],[], {}, 'post_events', ''],
  'Hub spotlight: delete post comment':['HUB', 'SPOTLIGHT', '', 'POST_COMMENT_DELETE', ['hub_id', 'post_id', 'comment_id'],[], {}, 'post_events', ''],
  'Hub spotlight: post share':['HUB', 'SPOTLIGHT', '', 'POST_SHARE', ['hub_id', 'post_id', 'share_id', 'network'],[], {'network': 'twitter'}, 'post_events', ''],
  'Hub spotlight: schedule post share':['HUB', 'SPOTLIGHT', '', 'POST_SHARE_SCHEDULE', ['hub_id', 'post_id', 'share_id', 'network'],[], {'network': 'twitter'}, 'post_events', ''],
  'Hub spotlight: open next/prev post':['HUB', 'SPOTLIGHT', '', 'OPEN', ['hub_id', 'post_id'],[], {}, 'post_events', 'set post_id to the id current post'],

  'Hub embeds: open post':['HUB', 'EMBED', '', 'OPEN', ['hub_id', 'post_id'],[], {}, 'post_events', ''],
  'Hub embeds: view post':['HUB', 'EMBED', '', 'VIEW', ['hub_id', 'post_id'],[], {}, 'post_events', ''],
  'Hub embeds: like post':['HUB', 'EMBED', '', 'POST_LIKE', ['hub_id', 'post_id'],[], {}, 'post_events', ''],
  'Hub embeds: unlike post':['HUB', 'EMBED', '', 'POST_UNLIKE', ['hub_id', 'post_id'],[], {}, 'post_events', ''],
  'Hub embeds: comment post':['HUB', 'EMBED', '', 'POST_COMMENT', ['hub_id', 'post_id', 'comment_id'],[], {}, 'post_events', ''],
  'Hub embeds: post share':['HUB', 'EMBED', '', 'POST_SHARE', ['hub_id', 'post_id', 'share_id', 'network'],[], {'network': 'twitter'}, 'post_events', ''],
  'Hub embeds: open post':['HUB', 'EMBED', 'SPOTLIGHT', 'OPEN', ['hub_id', 'post_id'],[], {}, 'post_events', ''],
  'Hub embeds: view post (inline spotlight)':['HUB', 'EMBED', 'SPOTLIGHT', 'VIEW', ['hub_id', 'post_id'],[], {}, 'post_events', ''],
  'Hub embeds: like post (inline spotlight)':['HUB', 'EMBED', 'SPOTLIGHT', 'POST_LIKE', ['hub_id', 'post_id'],[], {}, 'post_events', ''],
  'Hub embeds: unlike post  (inline spotlight)':['HUB', 'EMBED', 'SPOTLIGHT', 'POST_UNLIKE', ['hub_id', 'post_id'],[], {}, 'post_events', ''],
  'Hub embeds: comment post (inline spotlight)':['HUB', 'EMBED', 'SPOTLIGHT', 'POST_COMMENT', ['hub_id', 'post_id', 'comment_id'],[], {}, 'post_events', ''],
  'Hub embeds: post share  (inline spotlight)':['HUB', 'EMBED', 'SPOTLIGHT', 'POST_SHARE', ['hub_id', 'post_id', 'share_id', 'network'],[], {'network': 'twitter'}, 'post_events', ''],

  'Hub post: go to source (bypass spotlight)':['HUB', 'EXTERNAL', '', 'VIEW', ['hub_id', 'post_id'], [], {}, 'events', 'don\'t send it from web or mobile app - leave it to shortstuff'],

  'Hub team: view collaborators':['HUB_TEAM', 'COLLABORATORS', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub team: view members':['HUB_TEAM', 'MEMBERS', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub team: view invites':['HUB_TEAM', 'INVITES', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub team: leave hub':['HUB_TEAM', '', '', 'LEAVE', ['hub_id', 'account_id'], [], {}, 'events', ''],

  'Hub settings: view profile settings':['HUB_SETTINGS','PROFILE', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub settings: view custom domain settings':['HUB_SETTINGS', 'DOMAIN', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub settings: view advanved settings':['HUB_SETTINGS', 'ADVANCED', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub settings: update profile settings':['HUB_SETTINGS', 'PROFILE', '', 'UPDATE', ['hub_id'], [], {}, 'events', ''],
  'Hub settings: update custom domain settings':['HUB_SETTINGS', 'DOMAIN', '', 'UPDATE', ['hub_id'], [], {}, 'events', ''],
  'Hub settings: update advanved settings':['HUB_SETTINGS', 'ADVANCED', '', 'UPDATE', ['hub_id'], [], {}, 'events', ''],
  'Hub settings: delete hub':['HUB_SETTINGS', 'ADVANCED', '', 'DELETE', ['hub_id'], [], {}, 'events', ''],

  'Hub settings design: view cover':['HUB_SETTINGS_DESIGN', 'COVER', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub settings design: view header':['HUB_SETTINGS_DESIGN', 'HEADER', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub settings design: view text':['HUB_SETTINGS_DESIGN', 'TEXT', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub settings design: update cover':['HUB_SETTINGS_DESIGN', 'COVER', '', 'UPDATE', ['hub_id'], [], {}, 'events', ''],
  'Hub settings design: update header':['HUB_SETTINGS_DESIGN', 'HEADER', '', 'UPDATE', ['hub_id'], [], {}, 'events', ''],
  'Hub settings design: update text':['HUB_SETTINGS_DESIGN', 'TEXT', '', 'UPDATE', ['hub_id'], [], {}, 'events', ''],

  'Hub settings addons: view addons list':['HUB_SETTINGS_ADDONS', '', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub settings addons: view addon configuration':['HUB_SETTINGS_ADDONS', '', '', 'VIEW', ['hub_id', 'addon_config_id'], [], {}, 'events', ''],
  'Hub settings addons: create addon configuration':['HUB_SETTINGS_ADDONS', '', '', 'CREATE', ['hub_id', 'addon_config_id'], [], {}, 'events', ''],
  'Hub settings addons: update addon configuration':['HUB_SETTINGS_ADDONS', '', '', 'UPDATE', ['hub_id', 'addon_config_id'], [], {}, 'events', ''],
  'Hub settings addons: delete addon configuration':['HUB_SETTINGS_ADDONS', '', '', 'DELETE', ['hub_id', 'addon_config_id'], [], {}, 'events', ''],
  'Hub settings addons: enable addon configuration':['HUB_SETTINGS_ADDONS', '', '', 'PUBLISH', ['hub_id', 'addon_config_id'], [], {}, 'events', ''],
  'Hub settings addons: disable addon configuration':['HUB_SETTINGS_ADDONS', '', '', 'UNPUBLISH', ['hub_id', 'addon_config_id'], [], {}, 'events', ''],

  'Hub settings collections: view collection list':['HUB_SETTINGS_COLLECTIONS', '', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub settings collections: view collection settings':['HUB_SETTINGS_COLLECTIONS', '', '', 'VIEW', ['hub_id', 'collection_id'], [], {}, 'events', ''],
  'Hub settings collections: create collection':['HUB_SETTINGS_COLLECTIONS', '', '', 'CREATE', ['hub_id', 'collection_id'], [], {}, 'events', ''],
  'Hub settings collections: update collection settings':['HUB_SETTINGS_COLLECTIONS', '', '', 'UPDATE', ['hub_id', 'collection_id'], [], {}, 'events', ''],
  'Hub settings collections: delete collection':['HUB_SETTINGS_COLLECTIONS', '', '', 'DELETE', ['hub_id', 'collection_id'], [], {}, 'events', ''],

  'Hub settings CTAs: view CTA list':['HUB_SETTINGS_CTAS', '', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub settings CTAs: view CTA settings':['HUB_SETTINGS_CTAS', '', '', 'VIEW', ['hub_id', 'widget_id'], [], {}, 'events', ''],
  'Hub settings CTAs: create CTA':['HUB_SETTINGS_CTAS', '', '', 'CREATE', ['hub_id', 'widget_id'], [], {}, 'events', ''],
  'Hub settings CTAs: update CTA settings':['HUB_SETTINGS_CTAS', '', '', 'UPDATE', ['hub_id', 'widget_id'], [], {}, 'events', ''],
  'Hub settings CTAs: delete CTA':['HUB_SETTINGS_CTAS', '', '', 'DELETE', ['hub_id', 'widget_id'], [], {}, 'events', ''],

  'Hub settings Integrations: view list':['HUB_SETTINGS_INTEGRATIONS', '', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub settings Integrations: connect slack':['HUB_SETTINGS_INTEGRATIONS', 'SLACK', '', 'CREATE', ['hub_id'], [], {}, 'events', ''],

  'Hub feeds: view feed list':['HUB_MANAGE_CONTENT', 'FEEDS', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub feeds: search':['HUB_MANAGE_CONTENT', 'FEEDS', '', 'SEARCH', ['hub_id', 'network'], [], {"network":"rss"}, 'events', ''],
  'Hub feeds: create feed':['HUB_MANAGE_CONTENT', 'FEEDS', '', 'CREATE', ['hub_id', "feed_id", "network"], [], {"network":"rss"}, 'events', ''],
  'Hub feeds: update feed':['HUB_MANAGE_CONTENT', 'FEEDS', '', 'UPDATE', ['hub_id', "feed_id"], [], {}, 'events', ''],
  'Hub feeds: delete feed':['HUB_MANAGE_CONTENT', 'FEEDS', '', 'DELETE', ['hub_id', "feed_id"], [], {}, 'events', ''],
  'Hub feeds: select a piece of content':['HUB_MANAGE_CONTENT', 'FEEDS', '', 'OPEN', ['hub_id', "feed_id", "asset_id"], [], {"asset_id":"fsdfhslkfjsdlkfj"}, 'events', ''],

  'Hub newsletters: view newsletters list':['HUB_NEWSLETTERS', '', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub newsletters: preview newsletter':['HUB_NEWSLETTERS', '', '', 'VIEW', ['hub_id', 'newsletter_id'], [], {}, 'events', ''],
  'Hub newsletters: create newsletter':['HUB_NEWSLETTERS', '', '', 'CREATE', ['hub_id', "newsletter_id"], [], {}, 'events', ''],
  'Hub newsletters: update newsletter':['HUB_NEWSLETTERS', '', '', 'UPDATE', ['hub_id', "newsletter_id"], [], {}, 'events', ''],
  'Hub newsletters: delete newsletter':['HUB_NEWSLETTERS', '', '', 'DELETE', ['hub_id', "newsletter_id"], [], {}, 'events', ''],
  'Hub newsletters: send newsletter':['HUB_NEWSLETTERS', '', '', 'PUBLISH', ['hub_id', "newsletter_id"], [], {}, 'events', ''],
  'Hub newsletters: schedule newsletter':['HUB_NEWSLETTERS', '', '', 'SCHEDULE', ['hub_id', "newsletter_id"], [], {}, 'events', ''],

  'Hub newsletters: view mailing lists list':['HUB_NEWSLETTERS', 'MAILING_LISTS', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub newsletters: create mailing list':['HUB_NEWSLETTERS', 'MAILING_LISTS', '', 'CREATE', ['hub_id', "mailing_list_id"], [], {}, 'events', ''],
  'Hub newsletters: update mailing list':['HUB_NEWSLETTERS', 'MAILING_LISTS', '', 'UPDATE', ['hub_id', "mailing_list_id"], [], {}, 'events', ''],
  'Hub newsletters: delete mailing list':['HUB_NEWSLETTERS', 'MAILING_LISTS', '', 'DELETE', ['hub_id', "mailing_list_id"], [], {}, 'events', ''],

  'Hub newsletters: view templates list':['HUB_NEWSLETTERS', 'TEMPLATES', '', 'VIEW', ['hub_id'], [], {}, 'events', ''],
  'Hub newsletters: create template':['HUB_NEWSLETTERS', 'TEMPLATES', '', 'CREATE', ['hub_id', "template_id"], [], {}, 'events', ''],
  'Hub newsletters: update template':['HUB_NEWSLETTERS', 'TEMPLATES', '', 'UPDATE', ['hub_id', "template_id"], [], {}, 'events', ''],
  'Hub newsletters: delete template':['HUB_NEWSLETTERS', 'TEMPLATES', '', 'DELETE', ['hub_id', "template_id"], [], {}, 'events', ''],

  /* TODO: Email transmissions */


  /*
  'Hub>Analytics: view analytics': ['HUB_ANALYTICS', 'VIEW', ['hub_id']],

  'Hub>Embeds: view embeds': ['HUB', 'EMBED', '', '????', ['hub_id']],
  'Hub>Embeds: copy snippet stream': ['HUB', 'EMBED', '', '????', ['hub_id']],
  'Hub>Embeds: copy snippet gallery': ['HUB', 'EMBED', '', '????', ['hub_id']],
  'Hub>Embeds: copy snippet playlist': ['HUB', 'EMBED', '', '????', ['hub_id']],

  'Org: view org page': ['ORG_PROFILE', 'VIEW', ['account_id']],
  'Org: edit settings': ['ORG_SETTINGS', 'UPDATE', ['account_id']],
  'Org: view hubs': ['ORG_PROFILE', 'VIEW', []], // TODO: .. how to know they looked at 'hubs' tab..?
  'Org: view members': ['ORG_PROFILE', 'VIEW', []], // TODO ...?
  'Org: view posts': ['ORG_PROFILE', 'VIEW', []], // TODO ...? probably need ORG_PROFILE_POSTS etc..

  'User: view org page': ['ORG_PROFILE', 'VIEW', ['account_id']],
  'User: edit settings': ['ORG_SETTINGS', 'UPDATE', ['account_id']],
  'User: view hubs': ['ORG_PROFILE', 'VIEW', []], // TODO: .. how to know they looked at 'hubs' tab..?
  'User: view members': ['ORG_PROFILE', 'VIEW', []], // TODO ...?
  'User: view posts': ['ORG_PROFILE', 'VIEW', []], // TODO ...? probably need USER_PROFILE_POSTS etc..
*/
}
