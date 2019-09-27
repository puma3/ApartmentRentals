import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Typography from '@material-ui/core/Typography'
import { GridList } from '@material-ui/core'
import { SIZES } from '../../../../../shared/general/constants'
import AuthorizedView from '../../../../layouts/AuthorizedView'

const horizontalStyles = makeStyles(theme => ({
  card: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
    width: 345,
    backgroundSize: 'cover',
  },
}))

const ApartmentInfoContainer = styled.div`
  padding: ${SIZES['small']} ${SIZES['large']};
`

const HorizontalEntry = ({ apartment, apartment: { realtor } }) => {
  const classes = horizontalStyles()

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="https://media.architecturaldigest.in/wp-content/uploads/2018/04/All-photos-by-Kunal-Bhatia-866x487.jpg"
        title="Ted talk"
      />
      <ApartmentInfoContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" color="textPrimary" component="p">
            {apartment.name}
          </Typography>
          <AuthorizedView allowedRoles={['ADMIN', 'REALTOR']}>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </AuthorizedView>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '80%',
          }}
        >
          <div>
            <Typography variant="body1" color="textSecondary" component="p">
              {apartment.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`$ ${apartment.pricePerMonth} \u2022 ${
                apartment.floorAreaSize
              } sqft \u2022 ${apartment.numberOfRooms} ${
                apartment.numberOfRooms === 1 ? 'Room' : 'Rooms'
              }`}
            </Typography>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1" color="textSecondary" component="p">
              Realtor: {realtor.firstName} {realtor.lastName}
            </Typography>
            {apartment.available ? (
              <Typography variant="body1" color="primary" component="p">
                Available
              </Typography>
            ) : (
              <Typography variant="body1" color="secondary" component="p">
                Unavailable
              </Typography>
            )}
          </div>
        </div>
      </ApartmentInfoContainer>
    </Card>
  )
}

const verticalStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
}))

const VerticalEntry = ({ apartment, apartment: { realtor } }) => {
  const classes = verticalStyles()

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="https://media.architecturaldigest.in/wp-content/uploads/2018/04/All-photos-by-Kunal-Bhatia-866x487.jpg"
        title="Ted talk"
      />

      <ApartmentInfoContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" color="textPrimary" component="p">
            {apartment.name}
          </Typography>
          <AuthorizedView allowedRoles={['ADMIN', 'REALTOR']}>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </AuthorizedView>
        </div>
        <Typography variant="body1" color="textSecondary" component="p">
          {apartment.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {`$ ${apartment.pricePerMonth} \u2022 ${
            apartment.floorAreaSize
          } sqft \u2022 ${apartment.numberOfRooms} ${
            apartment.numberOfRooms === 1 ? 'Room' : 'Rooms'
          }`}
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: SIZES['medium'],
          }}
        >
          <Typography variant="body1" color="textSecondary" component="p">
            Realtor: {realtor.firstName} {realtor.lastName}
          </Typography>
          {apartment.available ? (
            <Typography variant="body1" color="primary" component="p">
              Available
            </Typography>
          ) : (
            <Typography variant="body1" color="secondary" component="p">
              Unavailable
            </Typography>
          )}
        </div>
      </ApartmentInfoContainer>
    </Card>
  )
}

const ApartmentList = ({ apartments, showMap }) => {
  return showMap ? (
    // Return Horizontal entries
    <GridList>
      {apartments.map((apartment, idx) => (
        <HorizontalEntry apartment={apartment} key={`hv${idx}`} />
      ))}
    </GridList>
  ) : (
    // Return Vertical entries
    apartments.map((apartment, idx) => (
      <VerticalEntry apartment={apartment} key={`vv${idx}`} />
    ))
  )
}

export default ApartmentList
