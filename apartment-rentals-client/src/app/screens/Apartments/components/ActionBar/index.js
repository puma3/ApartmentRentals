import React from 'react'
import styled from 'styled-components'
import { SIZES, COLORS } from '../../../../shared/general/constants'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import { FilterOptionWrapper } from './components/common'
import SizeFilter from './components/SizeFilter'
import PriceFilter from './components/PriceFilter'
import RoomsFilter from './components/RoomsFilter'

const Row = styled.div`
  display: flex;
  padding: 0 ${SIZES['large']};
  flex-direction: row;
  height: 49px;
  justify-content: space-between;
  border-bottom: ${COLORS['lighterGray']} solid 1px;
`

const FilterOptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const emptyFilters = {
  size: { minSize: null, maxSize: null },
  price: {
    minPrice: null,
    maxPrice: null,
  },
  numberOfRooms: {
    minRooms: null,
    maxRooms: null,
  },
}

const ActionBar = ({ showMap, setShowMap, filters, setFilters }) => {
  return (
    <Row>
      <FilterOptionsContainer>
        <FilterOptionWrapper>
          <Typography variant="body2" color="textSecondary" component="p">
            Filters:
          </Typography>
        </FilterOptionWrapper>
        <SizeFilter filters={filters} setFilters={setFilters} />
        <PriceFilter filters={filters} setFilters={setFilters} />
        <RoomsFilter filters={filters} setFilters={setFilters} />
      </FilterOptionsContainer>
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
    </Row>
  )
}

export default ActionBar
