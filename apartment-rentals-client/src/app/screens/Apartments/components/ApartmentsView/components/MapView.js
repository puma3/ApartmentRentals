import React from 'react'
import styled from 'styled-components'

import GoogleMapReact from 'google-map-react'

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`

const AnyReactComponent = ({ text }) => <div>{text}</div>

const MapView = ({ showMap, apartments }) => {
  return showMap ? (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyC-Hk5zO9bubN_xy_R5ktlH2L0uTeTYp_g' }}
        center={[-16.3937852, -71.5182117]}
        zoom={16}
      >
        {apartments.map(apartment => (
          <AnyReactComponent
            lat={apartment.latitude}
            lng={apartment.longitude}
            text={apartment.name}
          />
        ))}
      </GoogleMapReact>
    </MapContainer>
  ) : null
}

export default MapView
