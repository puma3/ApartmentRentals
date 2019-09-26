import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { CurrentUserConsumer } from '../../../shared/CurrentUserContext'

const AirTrafficController = ({ match }) => {
  console.log('match@AirTrafficController', match)

  return (
    <CurrentUserConsumer>
      {({ currentUser, loading }) => {
        console.log('currentUser', currentUser)
        console.log('redirect?', !currentUser && !loading)

        return (
          <Route
            exact
            path="/"
            render={() =>
              !currentUser && !loading ? (
                <Redirect to="/login" />
              ) : (
                <Redirect to="/app/apartments" />
              )
            }
          />
        )
      }}
    </CurrentUserConsumer>
  )
}

export default AirTrafficController
