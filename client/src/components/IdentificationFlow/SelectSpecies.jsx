import React, { useEffect, useState } from "react";

import predictionRequest from "../../services/predictionRequest";
import speciesDescriptionRequest from "../../services/speciesDescriptionRequest";
import speciesImageRequest from "../../services/speciesImageRequest";

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center gap-[64px]">
      <span className="loading loading-ring loading-lg size-[200px] text-primary"></span>
      <article className="prose">
        <h3 className="flex items-end gap-[8px]">
          {"Predicting most likely bird species"}
          <span className="loading loading-dots loading-md text-neautral"></span>
        </h3>
      </article>
    </div>
  );
}

export default function SpeciesSelector({ imageUrl, onConfirmation }) {
  const [speciesData, setSpeciesData] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSpeciesSelect = (species) => {
    setSelectedSpecies(species);
  };

  const handleConfirmation = () => {
    onConfirmation(selectedSpecies.class);
  };

  useEffect(() => {
    const fetchSpeciesData = async () => {
      setIsLoading(true);
      try {
        const predictions = await predictionRequest(imageUrl);
        const speciesDataWithDescriptions = await Promise.all(
          predictions.map(async (prediction) => {
            const description = await speciesDescriptionRequest(
              prediction.class
            );
            const imageUrl = await speciesImageRequest(prediction.class);
            return { ...prediction, description, imageUrl };
          })
        );
        setSpeciesData(speciesDataWithDescriptions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching species data:", error);
      }
    };

    if (imageUrl) {
      fetchSpeciesData();
    }
  }, [imageUrl]);

  return (
    <div className="flex bg-base-100 h-full justify-center items-center">
      {isLoading ? (
        // machine learning loading screen
        <LoadingScreen />
      ) : (
        // predicted species and selected species data
        <div className="flex flex-row gap-[32px]">
          <ul className="flex flex-col min-w-[200px] items-start gap-[16px]">
            {speciesData.map((species, index) => {
              return (
                <li key={index}>
                  <button
                    className={`btn w-[200px] ${
                      species.class === selectedSpecies?.class
                        ? "btn-primary"
                        : "btn-secondary"
                    }`}
                    onClick={() => handleSpeciesSelect(species)}
                  >
                    {species.class}
                  </button>
                </li>
              );
            })}
          </ul>
          <div>
            {selectedSpecies && (
              // selected species info
              <div className="flex flex-col gap-[16px]">
                <img
                  className="w-[200px] h-[200px] rounded-[16px]"
                  src={selectedSpecies.imageUrl}
                  alt={selectedSpecies.class}
                />
                <article className="prose">
                  <h2>{selectedSpecies.class}</h2>
                  <h3 className="text-neutral-200">scientific name</h3>
                  <p>{selectedSpecies.description}</p>
                </article>
                <div className="flex justify-start">
                  <button
                    className="btn btn-primary"
                    onClick={handleConfirmation}
                  >
                    Confirm Species
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
