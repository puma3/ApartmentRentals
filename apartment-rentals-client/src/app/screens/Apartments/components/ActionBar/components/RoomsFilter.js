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
    numberOfRooms: {
      minRooms: minRoomsFilterState,
      maxRooms: maxRoomsFilterState,
    },
    ...rest
  },
  minRooms: propMinRooms,
  maxRooms: propMaxRooms,
  setFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const defaultMinRooms = minRoomsFilterState || propMinRooms
  const defaultMaxRooms = maxRoomsFilterState || propMaxRooms

  const [minRooms, setMinRooms] = useState(defaultMinRooms)
  const [maxRooms, setMaxRooms] = useState(defaultMaxRooms)

  const clearFilter = () => {
    setFilters({ numberOfRooms: { minRooms: null, maxRooms: null }, ...rest })
    handleClose()
  }

  const saveFilter = () => {
    setFilters({ numberOfRooms: { minRooms, maxRooms }, ...rest })
    handleClose()
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const isActive = minRoomsFilterState || maxRoomsFilterState
  let filterText = 'Rooms'
  if (minRoomsFilterState && maxRoomsFilterState) {
    filterText = `${minRoomsFilterState} - ${maxRoomsFilterState} Rooms`
  } else if (minRoomsFilterState) {
    filterText = `${minRoomsFilterState}+ Rooms`
  } else if (maxRoomsFilterState) {
    filterText = `Up to ${maxRoomsFilterState} Rooms`
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
            min={propMinRooms}
            max={propMaxRooms}
            defaultValue={[defaultMinRooms, defaultMaxRooms]}
            onChange={(e, value) => {
              const [newMinValue, newMaxValue] = value
              setMinRooms(newMinValue)
              setMaxRooms(newMaxValue)
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
              label="Min. Rooms"
              value={minRooms}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="outlined-adornment-amount"
              variant="outlined"
              label="Max. Rooms"
              value={maxRooms}
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

export default RoomsFilter
