import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import ActionBar, { emptyFilters } from './components/ActionBar'
import { MainViewLayout } from '../shared/Layout'
import ApartmentsView from './components/ApartmentsView'
import AuthorizedView from '../layouts/AuthorizedView'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import AddApartmentDialog from './components/AddApartmentDialog'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: '20px',
  },
}))

const Apartments = ({ match }) => {
  const classes = useStyles()
  const [filters, setFilters] = useState(emptyFilters)
  const [showMap, setShowMap] = useState(true)

  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const handleClickOpen = () => {
    setAddDialogOpen(true)
  }
  const handleClose = () => {
    setAddDialogOpen(false)
  }

  return (
    <React.Fragment>
      <MainViewLayout>
        <ActionBar
          showMap={showMap}
          setShowMap={setShowMap}
          filters={filters}
          setFilters={setFilters}
        />
        <ApartmentsView showMap={showMap} filters={filters} />
      </MainViewLayout>
      <AuthorizedView allowedRoles={['ADMIN', 'REALTOR']}>
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={handleClickOpen}
          style={{ right: showMap ? '60px' : '20px' }}
        >
          <AddIcon />
        </Fab>
        <AddApartmentDialog open={addDialogOpen} handleClose={handleClose} />
      </AuthorizedView>
    </React.Fragment>
  )
}

export default Apartments
