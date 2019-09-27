import React, { useEffect, useState } from 'react'
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

const initialLatLng = { lat: -16.3937852, lng: -71.5182117 }

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

  const [defaultLatLng, setDefaultLatLng] = useState(initialLatLng)

  useEffect(() => {
    const first = data && data.apartments[0]
    setDefaultLatLng(
      first ? { lat: first.latitude, lng: first.longitude } : initialLatLng,
    )
  }, [data])

  return (
    <Wrapper showMap={showMap}>
      <ApartmentList
        apartments={apartments}
        showMap={showMap}
        loading={loading}
        setDefaultLatLng={setDefaultLatLng}
      />
      <Map
        apartments={apartments}
        showMap={showMap}
        defaultLatLng={defaultLatLng}
      />
    </Wrapper>
  )
}

export default ApartmentsView
