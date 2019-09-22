import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const UnauthenticatedRoute = ({
  component: Component,
  noRedirect,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem('X-User-Token') && !noRedirect) {
          return <Redirect to="/" />
        } else {
          return <Component {...props} />
        }
      }}
    />
  )
}

export default UnauthenticatedRoute
