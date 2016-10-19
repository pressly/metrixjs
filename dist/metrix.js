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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Metrix.js is a user behaviour tracker for Pressly apps. User data is
	// transmitted to the Pressly API server, however, it's in fact being
	// proxied to the Pressly Metrix web service.
	//
	// See https://www.optimizesmart.com/google-analytics-cookies-ultimate-guide/
	// for a detailed look at how GA cookies works, which is also the basis of this
	// implementation. We also implement UTM parameter support, see 

	var _util = __webpack_require__(1);

	var util = _interopRequireWildcard(_util);

	var _tracker = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./tracker\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _tracker2 = _interopRequireDefault(_tracker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CLIENT_ID_KEY = '_pmx';
	var CLIENT_ID_EXPIRY = 2 * 365 * 24 * 60; // 2 years in minutes
	// const CLIENT_SESSION = ' _pmxt'
	// const CLIENT_SESSION_EXPIRY = 10 // 10 minutes

	var SYNC_INTERVAL = 100; // in milliseconds

	var Metrix = function () {
	  function Metrix(serverHost) {
	    _classCallCheck(this, Metrix);

	    // api server host
	    this.serverHost = serverHost;

	    // user identity/fingerprint
	    this.clientID = this.identify();

	    // copy the query string where we might find some utm params
	    this.queryString = window.location.search;

	    // event queue
	    this.queue = [];

	    // sync enqueued events to the server
	    this.sync = util.debounce(this, this.dispatch, SYNC_INTERVAL);
	  }

	  // identify will find or create a user profile and session cookie


	  _createClass(Metrix, [{
	    key: 'identify',
	    value: function identify() {
	      // Find an existing user identity cookie or create a new one
	      var clientID = util.getCookie(CLIENT_ID_KEY);
	      if (clientID == '') {
	        clientID = util.generateClientID();
	      }

	      // Always set the user identity cookie, to push forward the expiry
	      util.setCookie(CLIENT_ID_KEY, clientID, CLIENT_ID_EXPIRY);

	      // Track the user session, if it expires, make a new one
	      // TODO: ask maciej we need this at all..
	      // let session = getCookie(CLIENT_SESSION)
	      // if (session == '') {
	      //   util.setCookie(CLIENT_SESSION, '1', CLIENT_SESSION_EXPIRY)
	      // }

	      return clientID;
	    }
	  }, {
	    key: 'clearIdentity',
	    value: function clearIdentity() {
	      if (false) {
	        util.setCookie(CLIENT_ID_KEY, '', 0);
	      }
	    }
	  }, {
	    key: 'track',
	    value: function track() {
	      var _this = this;

	      return (0, _tracker2.default)(this.clientID, function (event, payload, err) {
	        console.log('tracking', event, payload);
	        _this.queue.push(payload);
	        _this.sync();
	      });
	    }

	    // track(event, payload) {
	    //   console.log('tracking', event, payload)
	    //   let metric = tracker.Track(this.clientID, event, payload)
	    //   this.queue.push(metric)
	    //   this.sync()
	    // }

	  }, {
	    key: 'dispatch',
	    value: function dispatch() {
	      if (this.queue.length == 0) return;
	      console.log('dispatching...', this.queue);

	      // Copy te payload from the events and empty the queue.
	      // NOTE: I guess we dont have to worry about shared state in JS.
	      var payload = [].concat(_toConsumableArray(this.queue));
	      this.queue = [];

	      console.log('payload:', payload, 'queue:', this.queue);

	      // TODO HTTP POST it to the server
	    }
	  }]);

	  return Metrix;
	}();

	exports.default = Metrix;


	if (typeof fetch === 'undefined') {
	  throw 'metrix.js requires fetch(), check your runtime and try again.';
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _arguments = arguments;
	/* eslint no-undef: 0 */
	var generateClientID = exports.generateClientID = function generateClientID() {
	  var ts = new Date().getTime();
	  var rd = Math.floor(Math.random() * 1000000000);
	  return rd + '.' + ts;
	};

	var getCookie = exports.getCookie = function getCookie(cname) {
	  var name = cname + '=';
	  var ca = document.cookie.split(';');
	  for (var i = 0; i < ca.length; i++) {
	    var c = ca[i];
	    while (c.charAt(0) == ' ') {
	      c = c.substring(1);
	    }
	    if (c.indexOf(name) == 0) {
	      return c.substring(name.length, c.length);
	    }
	  }
	  return '';
	};

	// TODO: we should probably set domain= and maybe http only= too..?
	// ask Maciej ..
	var setCookie = exports.setCookie = function setCookie(cname, cvalue, durationInMinutes) {
	  var d = new Date();
	  d.setTime(d.getTime() + durationInMinutes * 60 * 1000);
	  var expires = 'expires=' + d.toUTCString();
	  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	};

	var debounce = exports.debounce = function debounce(context, func, wait, immediate) {
	  var timeout = void 0;
	  return function () {
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

/***/ }
/******/ ]);