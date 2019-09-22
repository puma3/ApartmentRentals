import React from "react";

import ApartmentList from "./components/ApartmentList";
import Map from "./components/MapView";

const ApartmentsView = ({ showMap }) => {
  return (
    <div>
      <ApartmentList showMap={showMap} />
      <Map showMap={showMap} />
    </div>
  );
};

export default ApartmentsView;
