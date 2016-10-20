/* eslint no-undef: 0 */
export const log = (...args) => {
  if (__DEV__) {
    console.log.apply(null, args)
  }
}

export const generateClientID = () => {
  let ts = (new Date()).getTime()
  let rd = Math.floor(Math.random()*1000000000)
  return `${rd}.${ts}`
}

export const generateSessionID = () => {
  // SessionID is just the current unix timestamp
  return (new Date()).getTime()
}

export const getCookies = (cnames) => {
  let vals = {}
  let cs = document.cookie.split(';')

  for (let i=0; i < cnames.length; i++) {
    let k = cnames[i]
    let cname = k + '='
    vals[k] = ''

    for (let x=0; x < cs.length; x++) {
      let c = cs[x]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(cname) == 0) {
        vals[k] = c.substring(cname.length, c.length)
        break
      }
    }
  }
  return vals
}

export const getCookie = (cname) => {
  return getCookies([cname])[cname]
}

export const setCookie = (cname, cvalue, durationInMinutes) => {
  let d = new Date()
  d.setTime(d.getTime() + (durationInMinutes*60*1000))
  let expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export const debounce = (func, wait, immediate) => {
  let timeout
  return () => {
    let context = this
    let args = arguments
    let later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
