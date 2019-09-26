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

const PriceFilter = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <FilterOptionWrapper>
      <FilterButton variant="outlined" color="primary" onClick={handleClick}>
        Price
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
            getAriaLabel={index =>
              index === 0 ? 'Minimum price' : 'Maximum price'
            }
            defaultValue={[20, 40]}
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
              value={20}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
            <TextField
              id="outlined-adornment-amount"
              variant="outlined"
              label="Max. Price"
              value={20}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </div>
          <PopoverButtonsWrapper>
            <Button onClick={handleClose} color="secondary">
              Clear
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Save
            </Button>
          </PopoverButtonsWrapper>
        </PopoverContent>
      </Popover>
    </FilterOptionWrapper>
  )
}

export default PriceFilter
