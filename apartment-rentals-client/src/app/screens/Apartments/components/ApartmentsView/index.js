import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'

import { APARTMENTS_QUERY } from '../../../shared/graphql/queries'

import ApartmentList from './components/ApartmentList'
import Map from './components/MapView'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${({ showMap }) =>
    showMap ? 'minmax(620px, 1fr) 1fr' : 'auto'};
`

const ApartmentsView = ({ showMap, filters }) => {
  const { loading, data, refetch } = useQuery(APARTMENTS_QUERY, {
    variables: {
      filters: { ...filters.size, ...filters.price, ...filters.numberOfRooms },
    },
  })

  useEffect(() => {
    refetch()
  }, [filters, refetch])

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
