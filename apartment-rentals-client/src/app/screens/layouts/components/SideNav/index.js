import React, { useState } from "react";
import styled from "styled-components";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import ApartmentIcon from "@material-ui/icons/Apartment";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SideNavLink from "./components/SideNavLink";

const sideNavWidth = 240;

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: sideNavWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: "hidden"
  },
  drawerPaperClose: {
    top: "none",
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7)
    }
  }
}));

const SideNavToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 4px;
`;

const SideNav = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      open={open}
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
      }}
    >
      <SideNavToggleWrapper>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </SideNavToggleWrapper>
      <Divider />
      <SideNavLink
        to="/app/apartments"
        linkText="Apartments"
        icon={ApartmentIcon}
      />
      <SideNavLink
        to="/app/realtors"
        linkText="Realtors"
        icon={AssignmentIndIcon}
      />
      <SideNavLink to="/app/clients" linkText="Clients" icon={PeopleIcon} />
      <Divider />
      <SideNavLink to="/logout" linkText="Log out" icon={ExitToAppIcon} />
    </Drawer>
  );
};

export default SideNav;
