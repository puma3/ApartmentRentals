import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import qs from 'query-string'

const AuthenticatedRoute = ({ component: Component, location, ...rest }) => {
  const currentUser = true

  return (
    <Route
      {...rest}
      render={props => {
        if (!currentUser) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                search: qs.stringify({
                  destinationPath: qs.stringify(location),
                }),
              }}
            />
          )
        } else {
          return <Component {...props} />
        }
      }}
    />
  )
}

export default AuthenticatedRoute
