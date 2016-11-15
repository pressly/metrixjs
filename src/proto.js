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
  USER_PROFILE: 200,
  USER_SETTINGS: 201,
  ORG_PROFILE: 300,
  ORG_SETTINGS: 301,
  HUB: 400,
  HUB_STREAM: 401,
  HUB_SPOTLIGHT: 402,
  HUB_SETTINGS: 403,
  HUB_TEAM: 404,
  HUB_FEEDS: 405,
  HUB_MANAGE_CONTENT: 406,
  HUB_NEWSLETTERS: 407,
  HUB_ANALYTICS: 408,
  HUB_EMBEDS: 409,
  FEED: 500,
  EXTERNAL: 600
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
  OPEN: 5,
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

