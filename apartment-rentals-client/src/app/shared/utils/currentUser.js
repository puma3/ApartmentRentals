class currentUserUtils {
  setHeaders = user => {
    localStorage.setItem('X-User-Token', user.authenticationToken)
    localStorage.setItem('X-User-Email', user.email)
  }

  removeHeaders = () => {
    localStorage.removeItem('X-User-Token')
    localStorage.removeItem('X-User-Email')
  }
}

export default new currentUserUtils()
