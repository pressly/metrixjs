/* eslint no-undef: 0 */
export const log = (...args) => {
  if (__DEV__) {
    console.log.apply(null, args)
  }
}

// ex: 411225986.1478031876
export const generateUID = () => {
  let ts = Math.floor((new Date()).getTime() / 1000) // unix timestamp in seconds
  let rd = Math.floor(Math.random()*1000000000) // 9 digits
  return `${rd}.${ts}`
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
