import React from 'react'
import styled from 'styled-components'
import { SIZES } from '../../../shared/general/constants'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const FilterRow = styled.div`
  display: flex;
  flex-direction: row;
  height: ${SIZES['mega']};
`

const FilterButton = styled.button``

const ActionBar = ({ showMap, setShowMap }) => {
  return (
    <FilterRow>
      <div>Filters:</div>
      <FilterButton>Size</FilterButton>
      <FilterButton>Price</FilterButton>
      <FilterButton>Number of Rooms</FilterButton>
      <FormControlLabel
        control={
          <Switch
            checked={showMap}
            onChange={() => setShowMap(!showMap)}
            value="checkedA"
          />
        }
        label="Show Map"
      />
    </FilterRow>
  )
}

export default ActionBar
