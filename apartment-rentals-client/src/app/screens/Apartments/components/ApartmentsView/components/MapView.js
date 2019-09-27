import React, { useState } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core'

import Button from '@material-ui/core/Button'
import GoogleMapReact from 'google-map-react'

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`

const MapMarker = styled.div`
  border: none;
  background: #ffffffaa;
  color: #3f51b5 !important;
  padding: 10px;
  text-transform: uppercase;
  text-align: center;
  font-weight: 700;
  border-radius: 7px;
  display: inline-block;
  transition: all 0.3s ease 0s;
  box-shadow: 0px 5px 40px -10px #3f51b5aa;
  white-space: nowrap;

  &:hover {
    padding: 11px;
    background: #3f51b5;
    color: #ffffff !important;
    letter-spacing: 1px;
    box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.3s ease 0s;
    z-index: 100;
  }
`

const PriceMarker = ({ apartment }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <MapMarker
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span>$ {apartment.pricePerMonth}</span>
    </MapMarker>
  )
}

const MapView = ({ showMap, apartments }) => {
  return showMap ? (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC-Hk5zO9bubN_xy_R5ktlH2L0uTeTYp_g' }}
        center={[-16.3937852, -71.5182117]}
        zoom={17}
      >
        {apartments.map(apartment => (
          <PriceMarker
            key={`marker-${apartment.id}`}
            lat={apartment.latitude}
            lng={apartment.longitude}
            apartment={apartment}
          />
        ))}
      </GoogleMapReact>
    </MapContainer>
  ) : null
}

export default MapView
