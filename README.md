metrix.js
=========

## Install

```shell
$ yarn
```

## Development

```shell
$ make run
```

This will start the metrix debug application at `./src/debug`
running on http://localhost:4000/


## Usage

```js
// Pressly app version in the form ':platform-:version' - for example,
//
//    blue suede: 'webapp-v4.6.0'
// native mobile: 'mobile-v5.0.0'
//         embed: 'embed-v2.0.0'
let APP_VERSION = 'webapp-v4.6.0'

// Metrix is thet tracker that will send events to the Pressly API (SERVER_HOST).
let PMX
if (__SSR__) {
  PMX = new MetrixNoop(SERVER_HOST, APP_VERSION)
}else {
  PMX = new Metrix(SERVER_HOST, APP_VERSION)
}
window.PMX = PMX

// Track events in your application, in the form: event(MODULE, EVENT, PAYLOAD)
// See src/proto.js for a list of supported modules and events.
PMX.track.event('HUB', 'VIEW', { hub_id:1 })
PMX.track.event('HUB_SPOTLIGHT', 'VIEW', { hub_id:1, post_id:1 })
```

## Distribution build

```shell
$ make dist
```

see distribution build at `dist/metrix.js`
