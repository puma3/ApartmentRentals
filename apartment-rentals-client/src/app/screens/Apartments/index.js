import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import ActionBar, { emptyFilters } from './components/ActionBar'
import { MainViewLayout } from '../shared/Layout'
import ApartmentsView from './components/ApartmentsView'
import AuthorizedView from '../layouts/AuthorizedView'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    right: '20px',
    bottom: '20px',
  },
}))

const Apartments = ({ match }) => {
  const classes = useStyles()
  const [filters, setFilters] = useState(emptyFilters)
  const [showMap, setShowMap] = useState(true)

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
        <Fab color="secondary" aria-label="add" className={classes.fab}>
          <AddIcon />
        </Fab>
      </AuthorizedView>
    </React.Fragment>
  )
}

export default Apartments
