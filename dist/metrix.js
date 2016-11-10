module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MetrixNoop = exports.Metrix = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Metrix.js is a user behaviour tracker for Pressly apps. User data is
	// transmitted to the Pressly API server, however, it's in fact being
	// proxied to the Pressly Metrix web service.
	//
	// See https://www.optimizesmart.com/google-analytics-cookies-ultimate-guide/
	// for a detailed look at how GA cookies works, which is also the basis of this
	// implementation. We also implement UTM parameter support, see

	var _util = __webpack_require__(1);

	var util = _interopRequireWildcard(_util);

	var _tracker = __webpack_require__(2);

	var _tracker2 = _interopRequireDefault(_tracker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Request path to POST event payloads on the server
	var SERVER_ENDPOINT = '/metrix';

	// Long-term persisted client id fingerprint
	var CLIENT_ID_KEY = '_pmx';
	var CLIENT_ID_EXPIRY = 2 * 365 * 24 * 60; // 2 years in minutes
	var CLIENT_ID_PARAM = 'cid'; // check query string for a client id

	// Short-lived cookie to identify a single visit from a client.
	// The session ID is actually the unix timestamp of the session start time.
	var SESSION_ID_KEY = '_pmxb';
	var SESSION_ID_EXPIRY = 15; // 15 minutes

	// Short-lived query string stored in the cookie in case a user removes
	// them from the url. We do this to persist UTM query params, as well
	// other potential query params we want to look out for. This cookie works
	// in coordination with the session cookie above.
	var SESSION_QS_KEY = '_pmxz';
	var SESSION_QS_EXPIRY = SESSION_ID_EXPIRY;

	// Amount of time given to batch work
	var DISPATCH_INTERVAL = 100; // 100 milliseconds
	var IDENTIFY_INTERVAL = 1 * 60 * 1000; // 1 minute in milliseconds

	// TODO: grab the client id from the query param if its there
	// check to make sure it has a . and X length..
	// set the cookie value (with presedence)
	//
	// TODO: use history API to remove the cid query param

	// Metrix is the core interface to identifying, tracking and dispatching
	// user behaviour events.

	var Metrix = exports.Metrix = function () {
	  function Metrix(serverHost) {
	    var _this = this;

	    _classCallCheck(this, Metrix);

	    this.identify = function () {
	      var cookieVals = util.getCookies([CLIENT_ID_KEY, SESSION_ID_KEY, SESSION_QS_KEY]);

	      // Find an existing user identity cookie or create a new one.
	      // Also, always update the expiry for the client id cookie.
	      var clientID = cookieVals[CLIENT_ID_KEY];
	      if (clientID == '') {
	        clientID = util.generateUID();
	      }
	      util.setCookie(CLIENT_ID_KEY, clientID, CLIENT_ID_EXPIRY);

	      // Track the user session, if it expires, make a new one.
	      // Also, always update the expiry for the session id cookie.
	      var sessionID = cookieVals[SESSION_ID_KEY];
	      if (sessionID == '') {
	        sessionID = util.generateUID();
	      }
	      util.setCookie(SESSION_ID_KEY, sessionID, SESSION_ID_EXPIRY);

	      // Track the session QS (Query String), this will have utm params
	      // that are important to report. We store them in a cookie for the
	      // session lifetime in case the qs changes during the session.
	      var sessionQS = cookieVals[SESSION_QS_KEY];
	      if (sessionQS == '') {
	        sessionQS = window.location.search.substr(1);
	      }
	      util.setCookie(SESSION_QS_KEY, sessionQS, SESSION_QS_EXPIRY);

	      util.log('clientID:', clientID);

	      _this.clientID = clientID;
	      _this.sessionID = sessionID;
	      _this.sessionQS = sessionQS;
	    };

	    this.enqueue = function (event, err) {
	      util.log('tracking:', event);
	      _this.queue.push(event);
	      _this.sync();
	    };

	    this.dispatch = function () {
	      if (_this.queue.length == 0) return;
	      util.log('dispatching...', _this.queue);

	      // payload setup for our batch of events
	      var payload = {
	        cid: _this.clientID,
	        sid: _this.sessionID,
	        sqs: _this.sessionQS,
	        tzo: _this.timezoneOffset,
	        events: []
	      };

	      // push the events into the payload and clear the queue
	      for (var i = 0; i < _this.queue.length; i++) {
	        var ev = _this.queue[i];
	        payload.events.push(ev.json());
	      }
	      _this.queue = [];

	      // Send the payload over to the metrix endpoint
	      fetch(_this.metrixURL, {
	        method: 'post',
	        mode: 'cors',
	        credentials: 'include',
	        headers: new Headers({
	          'Accept': 'application/json',
	          'Content-Type': 'application/json'
	        }),
	        body: JSON.stringify(payload)
	      }).then(function (resp) {
	        return resp.json();
	      }).then(function (result) {
	        util.log('metrix dispatch response:', result);
	      }).catch(function (err) {
	        console.error('metrix:', err);
	      });
	    };

	    // api server host
	    this.serverHost = serverHost.replace(/\/$/, '');
	    this.metrixURL = '' + this.serverHost + SERVER_ENDPOINT;

	    // Identify the user with a long and short lived fingerprint.
	    // As well, setup an interval to update the identity while a
	    // session is active.
	    this.identify();
	    setInterval(this.identify, IDENTIFY_INTERVAL);

	    // track the client's timezone offset
	    this.timezoneOffset = new Date().getTimezoneOffset();

	    // setup tracker methods for the client
	    this.track = (0, _tracker2.default)(this.enqueue);

	    // sync enqueued events to the server
	    this.sync = util.debounce(this.dispatch, DISPATCH_INTERVAL);

	    // event queue
	    this.queue = [];
	  }

	  // identify will find, create or update the user identity cookies.


	  _createClass(Metrix, [{
	    key: 'clearIdentity',
	    value: function clearIdentity() {
	      if (false) {
	        util.setCookie(CLIENT_ID_KEY, '', 0);
	        util.setCookie(SESSION_ID_KEY, '', 0);
	        util.setCookie(SESSION_QS_KEY, '', 0);
	      }
	    }
	  }]);

	  return Metrix;
	}();

	var MetrixNoop = exports.MetrixNoop = function MetrixNoop() {
	  _classCallCheck(this, MetrixNoop);

	  this.track = new Proxy({}, {
	    get: function get(target, name) {
	      return function () {};
	    }
	  });
	};

	if (typeof window !== 'undefined' && typeof window.fetch === 'undefined') {
	  throw 'metrix.js requires fetch(), check your runtime and try again.';
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _arguments = arguments;
	/* eslint no-undef: 0 */
	var log = exports.log = function log() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if (false) {
	    console.log.apply(null, args);
	  }
	};

	// ex: 411225986.1478031876
	var generateUID = exports.generateUID = function generateUID() {
	  var ts = Math.floor(new Date().getTime() / 1000); // unix timestamp in seconds
	  var rd = Math.floor(Math.random() * 1000000000); // 9 digits
	  return rd + '.' + ts;
	};

	var getCookies = exports.getCookies = function getCookies(cnames) {
	  var vals = {};
	  var cs = document.cookie.split(';');

	  for (var i = 0; i < cnames.length; i++) {
	    var k = cnames[i];
	    var cname = k + '=';
	    vals[k] = '';

	    for (var x = 0; x < cs.length; x++) {
	      var c = cs[x];
	      while (c.charAt(0) == ' ') {
	        c = c.substring(1);
	      }
	      if (c.indexOf(cname) == 0) {
	        vals[k] = c.substring(cname.length, c.length);
	        break;
	      }
	    }
	  }
	  return vals;
	};

	var getCookie = exports.getCookie = function getCookie(cname) {
	  return getCookies([cname])[cname];
	};

	var setCookie = exports.setCookie = function setCookie(cname, cvalue, durationInMinutes) {
	  var d = new Date();
	  d.setTime(d.getTime() + durationInMinutes * 60 * 1000);
	  var expires = 'expires=' + d.toUTCString();
	  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	};

	var debounce = exports.debounce = function debounce(func, wait, immediate) {
	  var timeout = void 0;
	  return function () {
	    var context = undefined;
	    var args = _arguments;
	    var later = function later() {
	      timeout = null;
	      if (!immediate) func.apply(context, args);
	    };
	    var callNow = immediate && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);
	    if (callNow) func.apply(context, args);
	  };
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//  weak
	/* eslint no-undef: 0 */

	// Import the ./proto.js file while injecting some code to declare the global variables
	// in the generated code, as well as export those variables.
	var proto = __webpack_require__(3);

	var Tracker = function Tracker(cb) {
	  return {
	    event: function event(moduleKey, eventKey, data) {
	      var ev = new Event(moduleKey, eventKey, data);
	      cb(ev, null);
	    },

	    options: proto.events
	  };
	};

	exports.default = Tracker;

	var Event = function () {
	  function Event(moduleKey, eventKey, data) {
	    _classCallCheck(this, Event);

	    this.module = moduleKey; // module key
	    this.eventType = eventKey; // event key

	    this.ts = new Date();
	    this.url = window.location.href;
	    this.data = data;

	    this.verifyKeys();
	  }

	  _createClass(Event, [{
	    key: 'verifyKeys',
	    value: function verifyKeys() {
	      var k = proto.events.Module[this.module];
	      if (k == undefined) {
	        console.error('metrix: ' + this.module + ' is an unsupported module.');
	      }
	      k = proto.events.Event[this.eventType];
	      if (k == undefined) {
	        console.error('metrix: ' + this.eventType + ' is an unsupported event.');
	      }
	    }

	    // event json

	  }, {
	    key: 'json',
	    value: function json() {
	      return {
	        ts: this.ts,
	        module: this.module,
	        event_type: this.eventType,
	        url: this.url,
	        data: this.data
	      };
	    }
	  }]);

	  return Event;
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	/*** IMPORTS FROM imports-loader ***/
	var goog = {provide:function(){}};
	var proto = {events:{}};

	'use strict';

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
	  FEED: 500
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


	/*** EXPORTS FROM exports-loader ***/
	module.exports = proto;

/***/ }
/******/ ]);