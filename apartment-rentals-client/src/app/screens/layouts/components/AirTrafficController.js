import React from "react";
import { Route, Redirect } from "react-router-dom";

const AirTrafficController = ({ match }) => {
  console.log("match@AirTrafficController", match);
  const currentUser = true;

  return (
    <Route
      exact
      path="/"
      render={() =>
        currentUser ? (
          <Redirect to="/app/apartments" />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AirTrafficController;
