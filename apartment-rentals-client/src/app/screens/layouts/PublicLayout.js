import React from 'react'
import { Route } from 'react-router-dom'

import currentUserUtils from '../../shared/utils/currentUser'

import Login from '../Login'
import PrivateLayout from './PrivateLayout'
import AirTrafficController from './components/AirTrafficController'
import UnauthenticatedRoute from './components/UnauthenticatedRoute'
import AuthenticatedRoute from './components/AuthenticatedRoute'

const PublicLayout = props => {
  return (
    <React.Fragment>
      <UnauthenticatedRoute path="/login" component={Login} />
      <AuthenticatedRoute path="/app" component={PrivateLayout} />
      <AirTrafficController />
      <Route
        path="*/logout"
        render={({ history }) => {
          currentUserUtils.removeHeaders()
          window.location.replace('/login')

          return null
        }}
      />
    </React.Fragment>
  )
}

export default PublicLayout
