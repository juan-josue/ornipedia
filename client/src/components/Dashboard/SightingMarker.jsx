import React from "react";
import { Marker } from "react-map-gl";

export default function SightingMarker({ sighting, handleSelectSighting }) {
  return (
    <Marker
      key={sighting.id}
      latitude={sighting.latitude}
      longitude={sighting.longitude}
      offsetLeft={-20}
      offsetTop={-10}
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        handleSelectSighting(sighting);
      }}
    />
  );
}
