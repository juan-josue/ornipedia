import React, { useState } from "react";
import Map, { Marker } from "react-map-gl";

export default function Location({ speciesClass, onConfirmation }) {
  const [viewState, setViewState] = useState({
    latitude: 14.839279,
    longitude: -89.142483,
    zoom: 1,
  });
  const [marker, setMarker] = useState(null);

  const handleMapClick = (event) => {
    const { lngLat } = event;

    setMarker({
      longitude: lngLat.lng,
      latitude: lngLat.lat,
    });

    setViewState({
      ...viewState,
      latitude: lngLat.lat,
      longitude: lngLat.lng,
      zoom: 15,
    });
  };

  const handleConfirmation = () => {
    if (marker) {
      onConfirmation({ ...marker });
    }
  };

  return (
    <div className="flex flex-col bg-base-100 h-full justify-center items-center">
      <div className="card card-side bg-base-100 shadow-xl">
        <Map
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          onClick={handleMapClick}
          style={{ width: 600, height: 400 }}
          mapStyle="mapbox://styles/mapbox/outdoors-v12"
        >
          {marker && (
            <Marker
              longitude={marker.longitude}
              latitude={marker.latitude}
              offsetLeft={-20}
              offsetTop={-10}
            ></Marker>
          )}
        </Map>
        <div className="card-body bg-base-300">
          <h2 className="card-title">
            {`Where did you see the ${speciesClass}?`}
          </h2>
          <p>Use the map to select a location for your sighting.</p>
          <div className="card-actions justify-end">
            <button
              className={`btn btn-primary ${marker ? '' : 'btn-disabled'}`}
              onClick={() => {
                handleConfirmation();
              }}
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
