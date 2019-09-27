import React, { useState } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core'

import Button from '@material-ui/core/Button'
import GoogleMapReact from 'google-map-react'
import Popover from '@material-ui/core/Popover'

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
    box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.3s ease 0s;
    z-index: 100;
  }
`

const K_HOVER_DISTANCE = 30

const PriceMarker = ({ apartment, $hover, ...props }) => {
  return (
    <div style={{ position: 'relative', right: '16px', bottom: '28px' }}>
      <MapMarker>$ {apartment.pricePerMonth}</MapMarker>
    </div>
  )
}

const MapView = ({ showMap, apartments, defaultLatLng: { lat, lng } }) => {
  return showMap ? (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC-Hk5zO9bubN_xy_R5ktlH2L0uTeTYp_g' }}
        center={[lat, lng]}
        zoom={17}
        hoverDistance={K_HOVER_DISTANCE}
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
