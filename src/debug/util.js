import { PMX } from './app'

export const getSession = () => {
  let sessionURI = PMX.serverHost + '/session'

  return window.fetch(sessionURI, {
    method: 'get',
    mode: 'cors',
    credentials: 'include'
  }).then((resp) => {
    return resp.json()
  }).catch((err) => {
    console.error(err)
  })
}
