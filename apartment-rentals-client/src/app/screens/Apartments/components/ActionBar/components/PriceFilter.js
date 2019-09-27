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

const PriceFilter = ({
  filters: {
    price: { minPrice: minPriceFilterState, maxPrice: maxPriceFilterState },
    ...rest
  },
  minPrice: propMinPrice,
  maxPrice: propMaxPrice,
  setFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const defaultMinPrice = minPriceFilterState || propMinPrice
  const defaultMaxPrice = maxPriceFilterState || propMaxPrice

  const [minPrice, setMinPrice] = useState(defaultMinPrice)
  const [maxPrice, setMaxPrice] = useState(defaultMaxPrice)

  const clearFilter = () => {
    setFilters({ price: { minPrice: null, maxPrice: null }, ...rest })
    handleClose()
  }

  const saveFilter = () => {
    setFilters({ price: { minPrice, maxPrice }, ...rest })
    handleClose()
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const isActive = minPriceFilterState || maxPriceFilterState
  let filterText = 'Price'
  if (minPriceFilterState && maxPriceFilterState) {
    filterText = `$ ${minPriceFilterState} - $ ${maxPriceFilterState}`
  } else if (minPriceFilterState) {
    filterText = `$ ${minPriceFilterState}+`
  } else if (maxPriceFilterState) {
    filterText = `Up to $${maxPriceFilterState}`
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
            min={propMinPrice}
            max={propMaxPrice}
            defaultValue={[defaultMinPrice, defaultMaxPrice]}
            onChange={(e, value) => {
              const [newMinValue, newMaxValue] = value
              setMinPrice(newMinValue)
              setMaxPrice(newMaxValue)
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
              id="outlined-adornment-amount"
              variant="outlined"
              label="Min. Price"
              value={minPrice}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="outlined-adornment-amount"
              variant="outlined"
              label="Max. Price"
              value={maxPrice}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
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

export default PriceFilter
