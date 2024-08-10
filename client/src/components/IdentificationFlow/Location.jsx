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
    <div>
    {`Where did you see the ${speciesClass}?`}
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onClick={handleMapClick}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      >
        {marker && (
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div
              style={{
                backgroundColor: "red",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
              }}
            />
          </Marker>
        )}
      </Map>
      {marker && (
        <div>
          <button
            onClick={() => {
              handleConfirmation();
            }}
          >
            Confirm Location
          </button>
          {`lat: ${marker.latitude}, lng: ${marker.longitude}`}
        </div>
      )}
    </div>
  );
}
