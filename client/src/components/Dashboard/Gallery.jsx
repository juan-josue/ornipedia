import React, { useState } from "react";

export default function Gallery({ sightings }) {
  const [selectedSightingId, setSelectedSightingId] = useState(null);

  const handleMouseEnter = (sightingId) => {
    setSelectedSightingId(sightingId);
  };

  const handleMouseLeave = () => {
    setSelectedSightingId(null);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="grid grid-cols-3 gap-[16px] w-[900px] overflow-y-auto pt-[16px] pb-[100px]">
        {sightings.map((sighting) => {
          const isSelected = sighting.id === selectedSightingId;

          return (
            <div
              key={sighting.id}
              className={`flex flex-col justify-end w-full h-[300px] rounded-[8px]`}
              style={{
                backgroundImage: `url(${sighting.image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onMouseEnter={() => handleMouseEnter(sighting.id)}
              onMouseLeave={() => handleMouseLeave()}
            >
              {isSelected && (
                <div className="bg-base-300 p-[8px] rounded-b-[8px]">
                  <article className="prose">
                    <h4>{sighting.species_class}</h4>
                    <p>{new Date(sighting.date).toLocaleDateString()}</p>
                  </article>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
