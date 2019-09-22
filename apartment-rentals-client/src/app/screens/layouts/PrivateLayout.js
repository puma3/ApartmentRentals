import React from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import SideNav from './components/SideNav'
import Apartments from '../Apartments'

const BodyContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
`

const PrivateLayout = ({ match }) => {
  return (
    <React.Fragment>
      <Header />
      <BodyContainer>
        <SideNav />
        <Switch>
          <Route path={`${match.path}/apartments`} component={Apartments} />
          <Route path={`${match.path}/realtors`} component={Apartments} />
          <Route path={`${match.path}/clients`} component={Apartments} />
        </Switch>
      </BodyContainer>
    </React.Fragment>
  )
}

export default PrivateLayout
