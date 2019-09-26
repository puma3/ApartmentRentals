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

const ApartmentsView = ({ showMap }) => {
  const { loading, data } = useQuery(APARTMENTS_QUERY)
  const apartmentList = loading ? [] : data.apartments

  return (
    <Wrapper showMap={showMap}>
      <ApartmentList
        apartments={apartmentList}
        showMap={showMap}
        loading={loading}
      />
      <Map apartments={apartmentList} showMap={showMap} />
    </Wrapper>
  )
}

export default ApartmentsView
