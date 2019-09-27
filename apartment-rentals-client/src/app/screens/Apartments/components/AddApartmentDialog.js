import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

import GoogleMapReact from 'google-map-react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import { TextField } from '@material-ui/core'

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

const AddApartmentDialog = ({ open, handleClose }) => (
  <Dialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={true || open}
    maxWidth="md"
    fullWidth
  >
    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
      Add Apartment
    </DialogTitle>
    <DialogContent dividers>
      <FormWrapper>
        <form>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="floorAreaSize"
            label="Floor Area"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="pricePerMonth"
            label="Monthly Price"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="numberOfRooms"
            label="Number of Rooms"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="longitude"
            label="Longitude"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="latitude"
            label="Latitude"
            fullWidth
          />
        </form>
        {/* <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
          center={[-16.3937852, -71.5182117]}
          zoom={17}
        /> */}
      </FormWrapper>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Add Apartment
      </Button>
    </DialogActions>
  </Dialog>
)

export default AddApartmentDialog
