import React, { useState } from 'react'
import ActionBar from './components/ActionBar'
import { MainViewLayout } from '../shared/Layout'
import ApartmentsView from './components/ApartmentsView'

const Apartments = ({ match }) => {
  const [showMap, setShowMap] = useState(true)

  return (
    <MainViewLayout>
      <ActionBar showMap={showMap} setShowMap={setShowMap} />
      <ApartmentsView showMap={showMap} />
    </MainViewLayout>
  )
}

export default Apartments
