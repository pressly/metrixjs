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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Metrix.js is a user behaviour tracker for Pressly apps. User data is
	// transmitted to the Pressly API server, however, it's in fact being
	// proxied to the Pressly Metrix web service.
	//
	// See https://www.optimizesmart.com/google-analytics-cookies-ultimate-guide/
	// for a detailed look at how GA cookies works, which is also the basis of this
	// implementation. We also implement UTM parameter support, see 

	var USER_IDENTITY = '_mx';
	var USER_VISIT = ' _mxt';

	var Metrix = function () {
	  function Metrix(serverHost) {
	    _classCallCheck(this, Metrix);

	    this.serverHost = serverHost;
	  }

	  _createClass(Metrix, [{
	    key: 'track',
	    value: function track(event, payload) {
	      console.log('tracking', event, payload);
	    }
	  }]);

	  return Metrix;
	}();

	// 1. We start by creating or find a user fingerprint + visit
	// effectively, this is the constructor.. and it should be on the current
	// domain/host.
	//
	// 
	//
	// TODO: createUser() - aka creates the user fingerprint 
	// and session hash
	// the cookies should be set on the very top-level domain.
	// MX1.2.<rand>.<created_at>
	// clientID = '<rand>.<created_at>'
	//
	// 2. 
	// ...
	//
	// X. track() events and queue them. The api.pressly.com receiving
	// server will notice the auth header or cookie, and it should keep
	// that into consideration on its own. We wouldn't know the jwt and
	// we dont want to assume we know the user id because that can be faked.
	//
	// Z. every 100ms, send() the queued events as a batch


	// TODO: what about staging.. and dev servers.. etc..


	exports.default = Metrix;
	var SERVER_HOST = 'http://api.pressly.com/';
	if (false) {
	  SERVER_HOST = 'http://localhost:5331/';
	}

	window.PresslyMetrix = new Metrix(SERVER_HOST);

/***/ }
/******/ ]);