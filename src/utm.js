// TODO: pause on this.. we might not need it. will leave it here for now.

const emptyUTMParams = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_term: null,
  utm_content: null
}

export class UTMParser {
  constructor(queryString) {
    this.params = {...emptyUTMParams}
    this.updateParams(queryString)
  }

  decode(queryString) {
    let params = {}
    queryString.substr(1).split('&').forEach((item) => {
      let [k,v] = item.split('=')
      v = v && decodeURIComponent(v)
      params[k] = (params[k] || []).push(v)
    })
    return params
  }

  updateParams(queryString) {
    this.params = this.decode(queryString)
  }

}

let windowUTM = new UTMParser(window.location.search)
export default function UTM() {
  return windowUTM
}
