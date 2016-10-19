/* eslint no-undef: 0 */
export const generateClientID = () => {
  let ts = (new Date()).getTime()
  let rd = Math.floor(Math.random()*1000000000)
  return `${rd}.${ts}`
}

export const getCookie = (cname) => {
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i=0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

// TODO: we should probably set domain= and maybe http only= too..?
// ask Maciej ..
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
