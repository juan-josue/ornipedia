import React from "react";
import Map, { Marker } from "react-map-gl";

export default function ReviewEntry({ entryData, onConfirmation }) {
  const {
    speciesClass,
    coordinates: { latitude, longitude },
    date,
  } = entryData;

  const handleConfirmation = () => {
    onConfirmation();
  };

  return (
    <div>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 15,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        dragPan={false}
        scrollZoom={false} 
        doubleClickZoom={false} 
        dragRotate={false} 
        touchZoomRotate={false}
      >
        <Marker
          longitude={longitude}
          latitude={latitude}
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
      </Map>
      <ul>
        <li>{speciesClass}</li>
        <li>{`lat: ${latitude} long: ${longitude}`}</li>
        <li>{date.toLocaleDateString()}</li>
      </ul>
      <button
        onClick={() => {
          handleConfirmation();
        }}
      >
        Confirm Entry
      </button>
    </div>
  );
}
