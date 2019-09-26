import React, { useState } from 'react'

import { SIZES } from '../../shared/general/constants'

import { MainViewLayout } from '../shared/Layout'
import UserTable from '../shared/UserTable'

const Realtors = () => {
  const [error, setError] = useState(null)

  return (
    <MainViewLayout style={{ padding: SIZES['xxl'], overflowY: 'auto' }}>
      <UserTable title="Realtors" role="REALTOR" />
    </MainViewLayout>
  )
}

export default Realtors
