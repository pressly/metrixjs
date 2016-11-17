import { AsyncStorage } from 'react-native'
import Storage from '../src/storage'

export default class NativeStorage extends Storage  {
  constructor() {
    super()
  }

  async getCookies(cnames) {}

  async getCookie(cname) {
    return await AsyncStorage.getItem(`metrix:${cname}`)
  }

  async setCookie(cname, cvalue, durationInMinutes) {
    if (cvalue === "") {
      return await AsyncStorage.removeItem(`metrix:${cname}`)
    }
    return await AsyncStorage.setItem(`metrix:${cname}`, cvalue)
  }
}
