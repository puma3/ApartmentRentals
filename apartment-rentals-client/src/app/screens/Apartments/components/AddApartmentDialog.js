import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import Geocode from 'react-geocode'

import GoogleMapReact from 'google-map-react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import {
  TextField,
  InputAdornment,
  Icon,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core'
import { SIZES } from '../../../shared/general/constants'
import RoomIcon from '@material-ui/icons/Room'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { CREATE_APARTMENT_MUTATION } from '../../shared/graphql/mutations'
import { USER_LIST_QUERY } from '../../shared/graphql/queries'

const GOOGLE_MAPS_API_KEY = 'AIzaSyC-Hk5zO9bubN_xy_R5ktlH2L0uTeTYp_g'

Geocode.setApiKey(GOOGLE_MAPS_API_KEY)

const FormWrapper = styled.div`
  width: 100%;
  height: 500px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-gap: 20px;
`

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const CurrentLocationMarker = () => {
  return (
    <div style={{ position: 'relative', right: '16px', bottom: '28px' }}>
      <Icon color="secondary">
        <RoomIcon />
      </Icon>
    </div>
  )
}

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

const AddApartmentDialog = ({ open, handleClose }) => {
  const [createApartmentMutation] = useMutation(CREATE_APARTMENT_MUTATION, {
    refetchQueries: ['ApartmentList'],
  })

  const { loading, data: realtorsData } = useQuery(USER_LIST_QUERY, {
    variables: {
      role: 'REALTOR',
    },
  })

  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [size, setSize] = useState(0)
  const [price, setPrice] = useState(0)
  const [rooms, setRooms] = useState(0)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [address, setAddress] = useState('')
  const [realtorEmail, setRealtorEmail] = useState('')

  const onMapClick = ({ lat, lng }) => {
    setLatitude(Math.round(lat * 100000000) / 100000000)
    setLongitude(Math.round(lng * 100000000) / 100000000)
  }

  const updateAddress = newAddress => {
    setAddress(newAddress)
    Geocode.fromAddress(newAddress).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location
        setLatitude(Math.round(lat * 100000000) / 100000000)
        setLongitude(Math.round(lng * 100000000) / 100000000)
      },
      error => {
        console.error(error)
      },
    )
  }

  const submitForm = e => {
    e.preventDefault()

    createApartmentMutation({
      variables: {
        input: {
          name,
          description,
          pricePerMonth: parseFloat(price),
          floorAreaSize: parseFloat(size),
          numberOfRooms: parseInt(rooms),
          address,
          latitude,
          longitude,
          realtorEmail,
        },
      },
      refetchQueries: ['ApartmentList'],
    })
    handleClose()
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Add Apartment
      </DialogTitle>
      <DialogContent dividers>
        <FormWrapper>
          <form id="create-apartment-form" onSubmit={submitForm}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridGap: SIZES['medium'],
              }}
            >
              <TextField
                margin="dense"
                id="floorAreaSize"
                label="Floor Area"
                type="number"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">SF</InputAdornment>
                  ),
                }}
                value={size}
                onChange={e => setSize(e.target.value)}
              />
              <TextField
                margin="dense"
                id="pricePerMonth"
                label="Monthly Price"
                type="number"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
              <TextField
                margin="dense"
                id="numberOfRooms"
                type="number"
                label="Rooms"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                value={rooms}
                onChange={e => setRooms(e.target.value)}
              />
            </div>
            <TextField
              margin="dense"
              id="address"
              label="Address"
              onChange={e => updateAddress(e.target.value)}
              value={address}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridGap: SIZES['medium'],
                marginBottom: SIZES['small'],
              }}
            >
              <TextField
                margin="dense"
                id="latitude"
                label="Latitude"
                value={latitude}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={e => setLatitude(e.target.value)}
              />
              <TextField
                margin="dense"
                id="longitude"
                label="Longitude"
                value={longitude}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
            <InputLabel shrink htmlFor="realtor-label-placeholder">
              Associated Realtor
            </InputLabel>
            <Select
              label="Realtor"
              value={realtorEmail}
              fullWidth
              required
              onChange={e => setRealtorEmail(e.target.value)}
              inputProps={{
                name: 'realtor',
                id: 'realtor-label-placeholder',
              }}
            >
              {loading ? (
                <MenuItem value="">No Realtor Users</MenuItem>
              ) : (
                realtorsData.users.map(realtor => (
                  <MenuItem value={realtor.email}>
                    {realtor.firstName} {realtor.lastName}
                  </MenuItem>
                ))
              )}
            </Select>
          </form>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: GOOGLE_MAPS_API_KEY,
            }}
            center={
              latitude && longitude
                ? [latitude, longitude]
                : [-16.3937852, -71.5182117]
            }
            onClick={onMapClick}
            zoom={17}
          >
            {latitude && longitude && (
              <CurrentLocationMarker lat={latitude} lng={longitude} />
            )}
          </GoogleMapReact>
        </FormWrapper>
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="create-apartment-form" color="primary">
          Add Apartment
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddApartmentDialog
