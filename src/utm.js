// @flow

import type {JSONData} from './json'

// NOTE: this code is currently not in use.. for now we're going to just
// copy the query parameters from the location url and send it along everytime
// we post data on dispatch


type UTMParams = {
  utm_source: ?string,
  utm_medium: ?string,
  utm_campaign: ?string,
  utm_term: ?string,
  utm_content: ?string
}

const emptyUTMParams: UTMParams = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_term: null,
  utm_content: null
}



export class UTMParser {
  params: UTMParams
  date: JSONData
  constructor(queryString: string) {    
    this.params = {...emptyUTMParams}
    this.updateParams(queryString)
  }

  decode(queryString: string): UTMParams {
    let params: UTMParams = {...emptyUTMParams}
    queryString.substr(1).split('&').forEach((item: string) => {
      let [k: string,v: string] = item.split('=')
      v = v && decodeURIComponent(v)
      params[k] = (params[k] || []).push(v)
    })
    return params
  }

  updateParams(queryString: string): void {
    this.params = this.decode(queryString)
  }

}

let windowUTM = new UTMParser(window.location.search)
export default function UTM() {
  return windowUTM
}
