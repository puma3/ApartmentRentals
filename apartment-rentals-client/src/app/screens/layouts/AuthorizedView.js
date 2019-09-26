import React from 'react'
import { CurrentUserConsumer } from '../../shared/CurrentUserContext'

const AuthorizedView = ({ children, allowedRoles }) => (
  <CurrentUserConsumer>
    {({ currentUser }) => {
      return allowedRoles.includes(currentUser.role) ? (
        <React.Fragment>{children}</React.Fragment>
      ) : null
    }}
  </CurrentUserConsumer>
)

export default AuthorizedView
