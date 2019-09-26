import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Redirect } from 'react-router-dom'

import { CurrentUserConsumer } from '../../shared/CurrentUserContext'

import Header from './components/Header'
import SideNav from './components/SideNav'
import Apartments from '../Apartments'
import Realtors from '../Realtors'
import Clients from '../Clients'
import AuthorizedView from './AuthorizedView'

const BodyContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
`

const PrivateLayout = ({ match }) => (
  <CurrentUserConsumer>
    {({ currentUser }) =>
      !currentUser ? (
        <Redirect to="/login" />
      ) : (
        <React.Fragment>
          <Header />
          <BodyContainer>
            <SideNav />
            <Switch>
              <Route path={`${match.path}/apartments`} component={Apartments} />
              <AuthorizedView allowedRoles={['ADMIN']}>
                <Route path={`${match.path}/realtors`} component={Realtors} />
                <Route path={`${match.path}/clients`} component={Clients} />
              </AuthorizedView>
            </Switch>
          </BodyContainer>
        </React.Fragment>
      )
    }
  </CurrentUserConsumer>
)

export default PrivateLayout
