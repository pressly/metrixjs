/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!


goog.provide('proto.events.Event');
goog.provide('proto.events.Module');


/**
 * @enum {number}
 */
proto.events.Module = {
  INVALID_MODULE: 0,
  LOGIN: 100,
  SIGNUP: 101,
  FEED: 200,
  USER_PROFILE: 300,
  USER_SETTINGS: 301,
  ORG_PROFILE: 400,
  ORG_SETTINGS: 401,
  HUB: 500,
  HUB_SETTINGS: 501,
  HUB_TEAM: 502,
  HUB_FEEDS: 503,
  HUB_MANAGE_CONTENT: 504,
  HUB_NEWSLETTERS: 505,
  HUB_ANALYTICS: 506,
  HUB_EMBEDS: 507
};

/**
 * @enum {number}
 */
proto.events.Event = {
  INVALID_EVENT: 0,
  CREATE: 1,
  VIEW: 2,
  UPDATE: 3,
  DELETE: 4,
  PASSWORD_LOGIN_FAIL: 101,
  PASSWORD_LOGIN_OK: 102,
  SSO_LOGIN_FAIL: 103,
  SSO_LOGIN_OK: 104,
  SOCIAL_LOGIN_FAIL: 105,
  SOCIAL_LOGIN_OK: 106,
  POST_LIKE: 200,
  POST_UNLIKE: 201,
  POST_SHARE: 202,
  POST_AMPLIFY: 203,
  POST_COMMENT: 204,
  POST_COMMENT_DELETE: 205
};

