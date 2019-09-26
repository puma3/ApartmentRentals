import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import ApartmentList from './components/ApartmentList'
import Map from './components/MapView'

const APARTMENTS_QUERY = gql`
  query ApartmentList {
    apartments {
      name
      address
      available
      description
      numberOfRooms
      floorAreaSize
      latitude
      longitude
      realtor {
        email
        firstName
        lastName
      }
    }
  }
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${({ showMap }) =>
    showMap ? 'minmax(620px, 1fr) 1fr' : 'auto'};
`

const ApartmentsView = ({ showMap, filters }) => {
  const { loading, data } = useQuery(APARTMENTS_QUERY, {
    variables: { filters },
  })
  const apartments = (data && data.apartments) || []
  return (
    <Wrapper showMap={showMap}>
      <ApartmentList
        apartments={apartments}
        showMap={showMap}
        loading={loading}
      />
      <Map apartments={apartments} showMap={showMap} />
    </Wrapper>
  )
}

export default ApartmentsView
