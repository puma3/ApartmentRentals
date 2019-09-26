import React from 'react'
import styled from 'styled-components'
import { SIZES, COLORS } from '../../../shared/general/constants'

import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'

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

const FilterOptionWrapper = styled.div`
  margin-right: ${SIZES['small']};
`

const FilterButton = styled(Button)`
  font-size: ${SIZES['small']};
`

const ActionBar = ({ showMap, setShowMap }) => {
  return (
    <Row>
      <FilterOptionsContainer>
        <FilterOptionWrapper>
          <Typography variant="body2" color="textSecondary" component="p">
            Filters:
          </Typography>
        </FilterOptionWrapper>
        <FilterOptionWrapper>
          <FilterButton variant="outlined" color="primary">
            Size
          </FilterButton>
        </FilterOptionWrapper>
        <FilterOptionWrapper>
          <FilterButton variant="outlined" color="primary">
            Price
          </FilterButton>
        </FilterOptionWrapper>
        <FilterOptionWrapper>
          <FilterButton variant="outlined" color="primary">
            Number of Rooms
          </FilterButton>
        </FilterOptionWrapper>
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
