import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Typography from '@material-ui/core/Typography'
import {
  GridList,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'
import { SIZES } from '../../../../../shared/general/constants'
import AuthorizedView from '../../../../layouts/AuthorizedView'
import {
  UPDATE_APARTMENT_MUTATION,
  DELETE_APARTMENT_MUTATION,
} from '../../../../shared/graphql/mutations'
import { useMutation } from '@apollo/react-hooks'

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

const ApartmentMenu = ({ apartment, setApartmentToEdit }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [updateApartmentMutation] = useMutation(UPDATE_APARTMENT_MUTATION)
  const [deleteApartmentMutation] = useMutation(DELETE_APARTMENT_MUTATION)

  const available = apartment && apartment.available

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDialogClose = () => {
    setDeleteDialogOpen(false)
  }

  const handleDialogConfirmation = () => {
    deleteApartmentMutation({
      variables: {
        input: { id: apartment.id },
      },
      refetchQueries: ['ApartmentList'],
    })
    handleDialogClose()
  }

  const toggleAvailability = () => {
    updateApartmentMutation({
      variables: {
        input: { id: apartment.id, available: !available },
      },
    })
    handleClose()
  }

  return (
    <React.Fragment>
      <IconButton size="small" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose()
            setApartmentToEdit(apartment)
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            setDeleteDialogOpen(true)
          }}
        >
          Delete
        </MenuItem>
        <MenuItem onClick={toggleAvailability}>
          Make {available ? 'Unavailable' : 'Available'}
        </MenuItem>
      </Menu>
      <Dialog open={deleteDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Delete Apartment?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You won't be able to undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDialogConfirmation} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

const HorizontalEntry = ({
  apartment,
  apartment: { realtor },
  setDefaultLatLng,
  setApartmentToEdit,
}) => {
  const classes = horizontalStyles()

  return (
    <div
      onClick={() => {
        setDefaultLatLng({
          lat: apartment.latitude,
          lng: apartment.longitude,
        })
      }}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://media.architecturaldigest.in/wp-content/uploads/2018/04/All-photos-by-Kunal-Bhatia-866x487.jpg"
          title="Apartment Photograph"
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
              <ApartmentMenu
                apartment={apartment}
                setApartmentToEdit={setApartmentToEdit}
              />
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
              <Typography variant="caption" color="textSecondary" component="p">
                {apartment.address}
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
    </div>
  )
}

const verticalStyles = makeStyles(theme => ({
  card: {
    width: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
}))

const VerticalEntry = ({
  apartment,
  apartment: { realtor },
  setApartmentToEdit,
}) => {
  const classes = verticalStyles()

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="https://media.architecturaldigest.in/wp-content/uploads/2018/04/All-photos-by-Kunal-Bhatia-866x487.jpg"
        title="Apartment Photograph"
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
            <ApartmentMenu setApartmentToEdit={setApartmentToEdit} />
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
            {realtor.firstName} {realtor.lastName}
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

const ApartmentList = ({
  apartments,
  showMap,
  setDefaultLatLng,
  setApartmentToEdit,
}) => {
  return showMap ? (
    // Return Horizontal entries
    <div style={{ overflowY: 'auto', overflowX: 'hidden' }}>
      <GridList>
        {apartments.map((apartment, idx) => (
          <HorizontalEntry
            apartment={apartment}
            key={`hv${idx}`}
            setDefaultLatLng={setDefaultLatLng}
            setApartmentToEdit={setApartmentToEdit}
          />
        ))}
      </GridList>
    </div>
  ) : (
    // Return Vertical entries
    <GridList>
      {apartments.map((apartment, idx) => (
        <VerticalEntry
          apartment={apartment}
          key={`vv${idx}`}
          setApartmentToEdit={setApartmentToEdit}
        />
      ))}
    </GridList>
  )
}

export default ApartmentList
