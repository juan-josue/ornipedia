import React from "react";
import { Popup } from "react-map-gl";

export default function SightingPopup({sighting, setSelectedSighting}) {
  return (
    <Popup
      longitude={sighting.longitude}
      latitude={sighting.latitude}
      anchor="bottom"
      onClose={() => setSelectedSighting(null)}
      closeButton={false}
      closeOnClick={true}
      className="rounded-lg p-4"
    >
      <div>
        <img
          className="w-full h-32 object-cover rounded-lg"
          src={sighting.image_url}
          alt={sighting.species_class}
        />
        <article className="prose mt-[16px]">
          <h4 className="text-base-100">{sighting.species_class}</h4>
          <p>{new Date(sighting.date).toLocaleDateString()}</p>
        </article>
      </div>
    </Popup>
  );
}
