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
import TextField from '@material-ui/core/TextField'

const RoomsFilter = ({
  filters: {
    numberOfRooms: { minRooms, maxRooms },
    ...rest
  },
  setFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const isActive = minRooms || maxRooms
  let filterText = 'Rooms'
  if (minRooms && maxRooms) {
    filterText = `${minRooms} - ${maxRooms} Rooms`
  } else if (minRooms) {
    filterText = `${minRooms}+ Rooms`
  } else if (maxRooms) {
    filterText = `Up to ${maxRooms} Rooms`
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
            getAriaLabel={index =>
              index === 0 ? 'Minimum Rooms' : 'Maximum Rooms'
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
              label="Min. Rooms"
              value={20}
            />
            <TextField
              id="outlined-adornment-amount"
              variant="outlined"
              label="Max. Rooms"
              value={20}
            />
          </div>
          <PopoverButtonsWrapper>
            <Button size="small" onClick={handleClose} color="secondary">
              Clear
            </Button>
            <Button
              size="small"
              onClick={handleClose}
              color="primary"
              autoFocus
            >
              Save
            </Button>
          </PopoverButtonsWrapper>
        </PopoverContent>
      </Popover>
    </FilterOptionWrapper>
  )
}

export default RoomsFilter
