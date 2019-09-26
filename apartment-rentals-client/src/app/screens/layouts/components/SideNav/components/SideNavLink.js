import React from 'react'
import styled from 'styled-components'
import { NavLink, withRouter } from 'react-router-dom'

import { SIZES, COLORS } from '../../../../../shared/general/constants'

const SideNavLinkWrapper = styled(NavLink).attrs(() => ({
  activeClassName: 'activeLink',
}))`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: ${SIZES['small']} ${SIZES['medium']};
  text-decoration: none;
  transition: border 200ms ease;
  border-left: 4px solid white;
  margin-right: 4px;
  color: inherit;
  white-space: nowrap;

  &.activeLink {
    &,
    &:visited {
      border-left: 4px solid ${COLORS['blue']};
      color: ${COLORS['blue']};
    }
  }
  &:hover,
  &:active {
    color: ${({ color }) => (color ? COLORS[color] : COLORS['blue'])};
  }
`

const NavText = styled.div`
  flex: 1;
  padding: 0 ${SIZES['large']};
`

const SideNavLink = ({ location, to, linkText, icon, color }) => {
  const isActive = path => location.pathname.includes(to)
  const NavIcon = icon

  return (
    <SideNavLinkWrapper to={to} isActive={isActive} color={color}>
      <NavIcon />
      <NavText>{linkText}</NavText>
    </SideNavLinkWrapper>
  )
}

export default withRouter(SideNavLink)
