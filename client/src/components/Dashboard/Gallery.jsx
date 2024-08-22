import React, { useState } from "react";
import { motion } from "framer-motion";

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
      <motion.div
        className="grid grid-cols-3 gap-[16px] w-[900px] overflow-y-auto pt-[16px] pb-[100px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
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
                <motion.div
                  className="bg-base-300 p-[8px] rounded-b-[8px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <article className="prose">
                    <h4>{sighting.species_class}</h4>
                    <p>{new Date(sighting.date).toLocaleDateString()}</p>
                  </article>
                </motion.div>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
