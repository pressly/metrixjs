/* eslint no-undef: 0 */

export type JSONData = | string | number | boolean | null | JSONObject | JSONArray
export type JSONObject = { [key:string]: JSONData }
export type JSONArray = Array<JSONData>

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
