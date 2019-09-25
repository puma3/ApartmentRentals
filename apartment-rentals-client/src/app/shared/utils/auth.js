import currentUser from './currentUser'

export const authScripts = {
  login: user => {
    return new Promise((resolve, reject) => {
      try {
        currentUser.setHeaders(user)
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  },
  logout: () => {
    return new Promise((resolve, reject) => {
      try {
        currentUser.removeHeaders()
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  },
}
