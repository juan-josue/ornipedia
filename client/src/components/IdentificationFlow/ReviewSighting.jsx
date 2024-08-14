import React from "react";
import Map, { Marker } from "react-map-gl";

export default function ReviewSighting({ sightingData, onConfirmation }) {
  const {
    imageUrl,
    speciesClass,
    coordinates: { latitude, longitude },
    date,
  } = sightingData;

  const handleConfirmation = async () => {
    onConfirmation();
  };

  return (
    <div className="flex flex-col gap-[64px] bg-base-100 h-full justify-center items-center">
      <div className="card card-side bg-base-100 shadow-xl">
        <Map
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          initialViewState={{
            longitude: longitude,
            latitude: latitude,
            zoom: 15,
          }}
          style={{ width: 600, height: 400 }}
          mapStyle="mapbox://styles/mapbox/outdoors-v12"
          dragPan={false}
          scrollZoom={false}
          doubleClickZoom={false}
          dragRotate={false}
          touchZoomRotate={false}
        >
          <Marker longitude={longitude} latitude={latitude}></Marker>
        </Map>
        <div className="card-body bg-base-300">
          <h2 className="card-title">
            {`Let's double check your sighting details`}
          </h2>
          <p>If everything looks good, press continue.</p>
          <div className="flex flex-col items-center">
            <img
              src={imageUrl}
              className="mask mask-heart"
              width={128}
              height={128}
              alt="selected bird species"
            />
          </div>
          <p>{`You saw a lovely ${speciesClass} on ${date.toLocaleDateString()}! Nice find!`}</p>

          <div className="card-actions justify-end">
            <button
              className={`btn btn-primary`}
              onClick={() => {
                handleConfirmation();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
