import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { CurrentUserConsumer } from '../../../shared/CurrentUserContext'

const AirTrafficController = ({ match }) => {
  console.log('match@AirTrafficController', match)

  return (
    <CurrentUserConsumer>
      {({ currentUser }) => {
        console.log('currentUser', currentUser)

        return (
          <Route
            exact
            path="/"
            render={() =>
              currentUser ? (
                <Redirect to="/app/apartments" />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        )
      }}
    </CurrentUserConsumer>
  )
}

export default AirTrafficController
