// NOTE: this is a small debug app only compiled while in dev mode.
import Metrix from 'metrix'

// let PresslyMetrix = window.PresslyMetrix
// PresslyMetrix.track('click', {page:1})

// TODO: what about staging.. and dev servers.. etc..
let SERVER_HOST = 'http://api.pressly.com/'
if (__DEV__) {
  SERVER_HOST = 'http://localhost:5331/'
}

// Step 1 - init MX, which also creates cookies for the profile and visit
let MX = window.MX = new Metrix(SERVER_HOST)

