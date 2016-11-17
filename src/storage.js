// @flow

export default class Storage {
  constructor() {

  }

  async getCookies(cnames: Array<string>): Promise<{}> {
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

  async getCookie(cname: string): Promise<string> {
    const values = await this.getCookies([cname])
    return values[cname]
  }

  async setCookie(cname: string, cvalue: string, durationInMinutes: number): Promise<> {
    let d = new Date()
    d.setTime(d.getTime() + (durationInMinutes*60*1000))
    let expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  }
}
