import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          Apartment Rentals
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
