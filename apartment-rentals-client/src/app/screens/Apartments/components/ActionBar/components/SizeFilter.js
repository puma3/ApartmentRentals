import React, { useState } from 'react'

import { SIZES } from '../../../../../shared/general/constants'

import Button from '@material-ui/core/Button'
import {
  FilterOptionWrapper,
  FilterButton,
  PopoverContent,
  PopoverButtonsWrapper,
} from './common'
import Popover from '@material-ui/core/Popover'
import { CustomSlider, ThumbComponent } from './CustomSlider'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'

const SizeFilter = ({
  filters: {
    size: { minSize: minSizeFilterState, maxSize: maxSizeFilterState },
    ...rest
  },
  minSize: propMinSize,
  maxSize: propMaxSize,
  setFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const defaultMinSize = minSizeFilterState || propMinSize
  const defaultMaxSize = maxSizeFilterState || propMaxSize

  const [minSize, setMinSize] = useState(defaultMinSize)
  const [maxSize, setMaxSize] = useState(defaultMaxSize)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const clearFilter = () => {
    setFilters({ size: { minSize: null, maxSize: null }, ...rest })
    handleClose()
  }

  const saveFilter = () => {
    setFilters({ size: { minSize, maxSize }, ...rest })
    handleClose()
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const isActive = minSizeFilterState || maxSizeFilterState
  let filterText = 'Size'
  if (minSizeFilterState && maxSizeFilterState) {
    filterText = `${minSizeFilterState} SF - ${maxSizeFilterState} SF`
  } else if (minSizeFilterState) {
    filterText = `${minSizeFilterState}+ SF`
  } else if (maxSizeFilterState) {
    filterText = `Up to ${maxSizeFilterState} SF`
  }

  return (
    <FilterOptionWrapper>
      <FilterButton
        variant={isActive ? 'contained' : 'outlined'}
        color="primary"
        onClick={handleClick}
        size="small"
      >
        {filterText}
      </FilterButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <PopoverContent>
          <CustomSlider
            ThumbComponent={ThumbComponent}
            min={propMinSize}
            max={propMaxSize}
            defaultValue={[defaultMinSize, defaultMaxSize]}
            onChange={(e, value) => {
              const [newMinValue, newMaxValue] = value
              setMinSize(newMinValue)
              setMaxSize(newMaxValue)
            }}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridGap: SIZES['medium'],
            }}
          >
            <TextField
              id="outlined-adornment-min"
              variant="outlined"
              disabled
              label="Min. Area"
              value={minSize}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">SF</InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="outlined-adornment-max"
              variant="outlined"
              disabled
              label="Max. Area"
              value={maxSize}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">SF</InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <PopoverButtonsWrapper>
            <Button size="small" onClick={clearFilter} color="secondary">
              Clear
            </Button>
            <Button size="small" onClick={saveFilter} color="primary" autoFocus>
              Save
            </Button>
          </PopoverButtonsWrapper>
        </PopoverContent>
      </Popover>
    </FilterOptionWrapper>
  )
}

export default SizeFilter
