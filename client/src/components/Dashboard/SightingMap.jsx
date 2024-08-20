import React, { useState, useRef } from "react";
import Map from "react-map-gl";

import SightingList from "./SightingList";
import LifeList from "./LifeList";
import SightingPopup from "./SightingPopup";
import SightingMarker from "./SightingMarker";

export default function SightingMap({ sightings }) {
  const mapRef = useRef();
  const [selectedSighting, setSelectedSighting] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: 14.839279,
    longitude: -89.142483,
    zoom: 3.5,
  });

  const flyToLocation = (latitude, longitude) => {
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      duration: 4000,
      zoom: 12,
    });
  };

  const handleSelectSighting = (sighting) => {
    const { latitude, longitude } = sighting;
    flyToLocation(latitude, longitude);
    setSelectedSighting(sighting);
  };

  return (
    <>
      <div className="flex flex-col justify-end bg-base-100 w-[400px] border-r-2 border-secondary">
        <LifeList sightings={sightings} />
      </div>

      <div className="relative flex w-full h-full">
        <Map
          ref={mapRef}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          className="absolute top-0 left-0 w-full h-full -z-10"
          mapStyle="mapbox://styles/mapbox/outdoors-v12"
        >
          {sightings.map((sighting) => {
            return (
              <SightingMarker
                key={sighting.id}
                sighting={sighting}
                handleSelectSighting={handleSelectSighting}
              />
            );
          })}
          {selectedSighting && (
            <SightingPopup
              sighting={selectedSighting}
              setSelectedSighting={setSelectedSighting}
            />
          )}
        </Map>

        <SightingList
          sightings={sightings}
          onSelectSighting={handleSelectSighting}
        />
      </div>
    </>
  );
}
