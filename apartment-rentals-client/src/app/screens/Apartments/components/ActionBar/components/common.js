import styled from 'styled-components'

import { SIZES } from '../../../../../shared/general/constants'

import Button from '@material-ui/core/Button'

export const FilterOptionWrapper = styled.div`
  margin-right: ${SIZES['small']};
`

export const FilterButton = styled(Button)`
  font-size: ${SIZES['xxxs']};
`

export const PopoverContent = styled.div`
  display: grid;
  width: 330px;
  grid-gap: ${SIZES['large']};
  padding: ${SIZES['large']} ${SIZES['xxl']} ${SIZES['small']} ${SIZES['xl']};
`

export const PopoverButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
