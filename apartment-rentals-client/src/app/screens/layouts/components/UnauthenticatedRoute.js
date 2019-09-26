import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { CurrentUserConsumer } from '../../../shared/CurrentUserContext'

const UnauthenticatedRoute = ({
  component: Component,
  noRedirect,
  ...rest
}) => {
  return (
    <CurrentUserConsumer>
      {({ currentUser }) => (
        <Route
          {...rest}
          render={props => {
            if (currentUser && !noRedirect) {
              return <Redirect to="/" />
            } else {
              return <Component {...props} />
            }
          }}
        />
      )}
    </CurrentUserConsumer>
  )
}

export default UnauthenticatedRoute
