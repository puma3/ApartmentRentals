import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Typography from '@material-ui/core/Typography'

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

const HorizontalEntry = ({ apartment }) => {
  const classes = horizontalStyles()

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="https://img.staticmb.com/mbimages/project/Photo_h310_w462/Project-Photo-19-Global-Apartment-Phase-II-Patna-5093703_345_1366_310_462.jpg"
        title="Ted talk"
      />
      <div>
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
        <Typography variant="body1" color="textPrimary" component="p">
          {apartment.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {apartment.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${apartment.floorAreaSize}m2 - ${apartment.numberOfRooms} rooms`}
        </Typography>
      </div>
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

const VerticalEntry = ({ apartment }) => {
  const classes = verticalStyles()

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="https://img.staticmb.com/mbimages/project/Photo_h310_w462/Project-Photo-19-Global-Apartment-Phase-II-Patna-5093703_345_1366_310_462.jpg"
        title="Ted talk"
      />

      <IconButton aria-label="settings">
        <MoreVertIcon />
      </IconButton>
      <Typography variant="body1" color="textPrimary" component="p">
        {apartment.name}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {apartment.description}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {`${apartment.floorAreaSize}m2 - ${apartment.numberOfRooms} rooms`}
      </Typography>
    </Card>
  )
}

const ApartmentList = ({ apartments, showMap }) => {
  return showMap ? (
    // Return Horizontal entries
    <div>
      {apartments.map((apartment, idx) => (
        <HorizontalEntry apartment={apartment} key={`hv${idx}`} />
      ))}
    </div>
  ) : (
    // Return Vertical entries
    apartments.map((apartment, idx) => (
      <VerticalEntry apartment={apartment} key={`vv${idx}`} />
    ))
  )
}

export default ApartmentList
