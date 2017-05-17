!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function o(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(i,o){try{var a=t[i](o),s=a.value}catch(e){return void n(e)}return a.done?void e(s):Promise.resolve(s).then(function(e){r("next",e)},function(e){r("throw",e)})}return r("next")})}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.MetrixNoop=t.Metrix=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(1),E=i(u),c=n(2),_=r(c),f=n(4),d=r(f),l="undefined"!=typeof document,h="/metrix",I="_pmx",T=1051200,p="_pmxb",v=15,N="_pmxz",S=v,A="_pmxr",D=100,O=6e4,L=t.Metrix=function(){function e(t,n,r,i){var s=this;if(a(this,e),this.cleanUp=function(){clearInterval(s.intervalHandler),s.intervalHandler=0},this.identify=o(regeneratorRuntime.mark(function e(){var t,n,r,i,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.storage.getCookies([I,p,N,A]);case 2:return t=e.sent,n=t[I],n||(n=E.generateUID()),e.next=7,s.storage.setCookie(I,n,T);case 7:return r=t[p],r||(r=E.generateUID()),e.next=11,s.storage.setCookie(p,r,v);case 11:return i=t[N],i||(i=window.location.search.substr(1)),e.next=15,s.storage.setCookie(N,i,S);case 15:return o=t[A],o||(o=l&&document.referrer),e.next=19,s.storage.setCookie(A,o,S);case 19:E.log("clientID:",n),s.clientID=n,s.sessionID=r,s.sessionQS=i,s.referrer=o;case 24:case"end":return e.stop()}},e,s)})),this.enqueue=function(e){E.log("tracking",e),s.queue.push(e),s.sync()},this.dispatch=function(){if(0!=s.queue.length){for(var e={v:s.appVersion,cid:s.clientID,sid:s.sessionID,sqs:s.sessionQS,tzo:s.timezoneOffset,referrer:s.referrer,events:[]},t=0;t<s.queue.length;t++){var n=s.queue[t];e.events.push(n.json())}s.queue=[],E.log("post to server:",e);var r=new Headers({Accept:"application/json","Content-Type":"application/json"});null!=s.authToken&&""!=s.authToken&&r.append("Authorization","BEARER "+s.authToken),fetch(s.metrixURL,{method:"POST",mode:"cors",credentials:"include",headers:r,body:JSON.stringify(e)}).then(function(e){if(204!==e.status)return e.json()}).then(function(e){E.log("metrix dispatch response:",e)}).catch(function(e){console.error("metrix:",e)})}},"undefined"!=typeof window&&"undefined"==typeof window.fetch)throw"metrix.js requires fetch(), check your runtime and try again.";i||(i=new d.default),this.storage=i,this.serverHost=t.replace(/\/$/,""),this.metrixURL=""+this.serverHost+h,this.appVersion=n,n||console.error("metrix: appVersion is required."),this.authToken=r,this.identify(),this.intervalHandler=setInterval(this.identify,O),this.timezoneOffset=(new Date).getTimezoneOffset(),this.track=(0,_.default)(this.enqueue),this.sync=E.debounce(this.dispatch,D),this.queue=[]}return s(e,[{key:"clearIdentity",value:function(){function e(){return t.apply(this,arguments)}var t=o(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.next=7;break;case 3:return e.next=5,this.storage.setCookie(p,"",0);case 5:return e.next=7,this.storage.setCookie(N,"",0);case 7:case"end":return e.stop()}},e,this)}));return e}()}]),e}(),R=t.MetrixNoop=function e(){a(this,e),this.track={event:function(){}}},C=l?L:R;t.default=C},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=arguments;t.log=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n]},t.generateUID=function(){var e=Math.floor((new Date).getTime()/1e3),t=Math.floor(1e9*Math.random());return t+"."+e},t.debounce=function(e,t,n){var i=void 0;return function(){var o=void 0,a=r,s=function(){i=null,n||e.apply(o,a)},u=n&&!i;clearTimeout(i),i=setTimeout(s,t),u&&e.apply(o,a)}}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(3),a=function(e){return{event:function(t,n,r,i,o){var a=new s(t,n,r,i,o);e(a,null)},options:o.events}};t.default=a;var s=t.Event=function(){function e(t,n,i,o,a){r(this,e),this.getCurrentURL=function(){if("undefined"!=typeof window&&window.location&&window.location.href)return window.location.href},this.module=t,this.section=n,this.element=i,this.eventType=o,this.ts=new Date,this.url=this.getCurrentURL(),this.data=a,this.verifyKeys()}return i(e,[{key:"verifyKeys",value:function(){var e=o.events.Module[this.module];void 0==e&&console.error("metrix: "+this.module+" is an unsupported module."),e=o.events.Event[this.eventType],void 0==e&&console.error("metrix: "+this.eventType+" is an unsupported event.")}},{key:"json",value:function(){var e={ts:this.ts,module:this.module,event_type:this.eventType,url:this.url};return this.section&&(e.section=this.section),this.element&&(e.element=this.element),this.data&&(this.data.hub_id&&(e.hub_id=this.data.hub_id,delete this.data.hub_id),this.data.post_id&&(e.post_id=this.data.post_id,delete this.data.post_id),this.data.account_id&&(e.account_id=this.data.account_id,delete this.data.account_id),this.data.org_id&&(e.account_id=this.data.org_id,delete this.data.org_id),this.data.object_id&&(e.object_id=this.data.object_id,delete this.data.object_id),e.data=this.data),e}}]),e}()},function(e,t){var n={provide:function(){}},r={events:{}};n.provide("proto.events.Event"),n.provide("proto.events.Module"),r.events.Module={INVALID_MODULE:0,LOGIN:100,SIGNUP:101,FEED:200,USER:300,ORG:301,USER_SETTINGS:400,ORG_SETTINGS:401,HUB:500,HUB_TEAM:501,HUB_SETTINGS:600,HUB_SETTINGS_DESIGN:601,HUB_SETTINGS_ADDONS:602,HUB_SETTINGS_COLLECTIONS:603,HUB_SETTINGS_EMBEDS:604,HUB_SETTINGS_INTEGRATIONS:605,HUB_SETTINGS_CTAS:606,HUB_MANAGE_CONTENT:700,HUB_NEWSLETTERS:701,HUB_NEWSLETTERS_TEMPLATES:702,HUB_NEWSLETTERS_MAILING_LISTS:703,HUB_ANALYTICS:704,HUB_COMPOSE:705,EMAIL:800,EMBED:900,BOOKMARKLET:901},r.events.Event={INVALID_EVENT:0,CREATE:1,VIEW:2,UPDATE:3,DELETE:4,OPEN:5,PUBLISH:15,UNPUBLISH:16,SCHEDULE:17,DRAFT:18,JOIN:6,LEAVE:7,INVITE:8,ACCEPT:9,REJECT:10,REQUEST_ACCESS:11,GRANT_ACCESS:12,DENY_ACCESS:13,REVOKE_ACCESS:14,FOLLOW:19,UNFOLLOW:20,LOGIN_FAIL:101,LOGIN_OK:102,POST_LIKE:200,POST_UNLIKE:201,POST_SHARE:202,POST_AMPLIFY:203,POST_COMMENT:204,POST_COMMENT_DELETE:205,POST_SHARE_SCHEDULE:206,POST_FEATURE:207,POST_UNFEATURE:208,POST_PIN:209,POST_UNPIN:210,POST_HIDE:211,POST_UNHIDE:212,POST_REORDER:213,POST_COMMENT_UPDATE:214,POST_SHARE_INTENT:215,POST_SUBMITTED:216,POST_SUBMISSION_APPROVED:217,POST_SUBMISSION_REJECTED:218,EMAIL_PENDING_ACCEPTED:300,EMAIL_PENDING_DELAYED_UNKNOWN:301,EMAIL_PENDING_DELAYED_GRAYLIST:302,EMAIL_PENDING_DELAYED_RATE_LIMIT:303,EMAIL_PENDING_MAILBOX_FULL:304,EMAIL_PENDING_SERVER_ERROR:305,EMAIL_REJECTED_UNSUBSCRIBED:310,EMAIL_REJECTED_SPAM_COMPLAINT:311,EMAIL_REJECTED_INVALID_RECIPIENT:312,EMAIL_REJECTED_HARD_BOUNCED:313,EMAIL_REJECTED_UNKNOWN:314,EMAIL_BOUNCED_UNKNOWN:320,EMAIL_BOUNCED_DROPPED:321,EMAIL_BOUNCED_INVALID_RECIPIENT:322,EMAIL_BOUNCED_SPAM_SENDER:323,EMAIL_BOUNCED_SPAM_CONTENT:324,EMAIL_BOUNCED_TOO_LARGE:325,EMAIL_BOUNCED_BLOCKED:326,EMAIL_BOUNCED_MAILBOX_FULL:327,EMAIL_DELIVERED:330,EMAIL_DELIVERED_OPENED:331,EMAIL_DELIVERED_CLICKED:332,EMAIL_DELIVERED_SHARED:333,EMAIL_DELIVERED_UNSUBSCRIBED:334,EMAIL_DELIVERED_SPAM_COMPLAINT:335,VIEWER_LOAD:400,VIEWER_NAVIGATE:401,VIEWER_PRINT:402,VIEWER_PAGE_RENDERED:403,VIEWER_PAGE_FOCUS:404,VIEWER_SCROLL_START:405,VIEWER_SCROLL_END:406,VIEWER_ANNOTATION_CREATED:407,VIEWER_ANNOTATION_DELETED:408,VIEWER_PLAY:409,VIEWER_PAUSE:410,VIEWER_SEEK:411,VIEWER_SPEED_CHANGE:412,VIEWER_BANDWIDTH_ADAPT:413},e.exports=r},function(e,t){"use strict";function n(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(i,o){try{var a=t[i](o),s=a.value}catch(e){return void n(e)}return a.done?void e(s):Promise.resolve(s).then(function(e){r("next",e)},function(e){r("throw",e)})}return r("next")})}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(){r(this,e)}return i(e,[{key:"getCookies",value:function(){function e(e){return t.apply(this,arguments)}var t=n(regeneratorRuntime.mark(function e(t){var n,r,i,o,a,s,u;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n={},r=document.cookie.split(";"),i=0;case 3:if(!(i<t.length)){e.next=20;break}o=t[i],a=o+"=",n[o]="",s=0;case 8:if(!(s<r.length)){e.next=17;break}for(u=r[s];" "==u.charAt(0);)u=u.substring(1);if(0!=u.indexOf(a)){e.next=14;break}return n[o]=u.substring(a.length,u.length),e.abrupt("break",17);case 14:s++,e.next=8;break;case 17:i++,e.next=3;break;case 20:return e.abrupt("return",n);case 21:case"end":return e.stop()}},e,this)}));return e}()},{key:"getCookie",value:function(){function e(e){return t.apply(this,arguments)}var t=n(regeneratorRuntime.mark(function e(t){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getCookies([t]);case 2:return n=e.sent,e.abrupt("return",n[t]);case 4:case"end":return e.stop()}},e,this)}));return e}()},{key:"setCookie",value:function(){function e(e,n,r){return t.apply(this,arguments)}var t=n(regeneratorRuntime.mark(function e(t,n,r){var i,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:i=new Date,i.setTime(i.getTime()+60*r*1e3),o="expires="+i.toUTCString(),document.cookie=t+"="+n+";"+o+";path=/";case 4:case"end":return e.stop()}},e,this)}));return e}()}]),e}();t.default=o}])});