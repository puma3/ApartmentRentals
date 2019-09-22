import React from 'react'

import Login from '../Login'
import PrivateLayout from './PrivateLayout'
import AirTrafficController from './components/AirTrafficController'
import UnauthenticatedRoute from './components/UnauthenticatedRoute'
import AuthenticatedRoute from './components/AuthenticatedRoute'

const PublicLayout = props => {
  return (
    <React.Fragment>
      <UnauthenticatedRoute path="/login" component={Login} />
      <AirTrafficController />
      <AuthenticatedRoute path="/app" component={PrivateLayout} />
    </React.Fragment>
  )
}

export default PublicLayout
