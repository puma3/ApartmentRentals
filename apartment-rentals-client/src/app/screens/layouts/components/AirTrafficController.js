import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { CurrentUserConsumer } from '../../../shared/CurrentUserContext'

const AirTrafficController = ({ match }) => (
  <CurrentUserConsumer>
    {({ currentUser, loading }) => (
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
    )}
  </CurrentUserConsumer>
)

export default AirTrafficController
