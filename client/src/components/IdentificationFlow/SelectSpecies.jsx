import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ErrorScreen from "../ErrorScreen";

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
  const [errorMessage, setErrorMessage] = useState();

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
        const speciesDataResult = await Promise.all(
          predictions.map(async (prediction) => {
            const description = await speciesDescriptionRequest(
              prediction.class
            );
            const image_url = await speciesImageRequest(prediction.class);
            return {
              ...prediction,
              ...description,
              image_url,
            };
          })
        );
        setSpeciesData(speciesDataResult);
        setIsLoading(false);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching species data:", error);
        setErrorMessage(error.message);
        setIsLoading(false);
      }
    };

    if (imageUrl) {
      fetchSpeciesData();
    }
  }, [imageUrl]);

  return (
    <div className="flex bg-base-100 h-full justify-center items-center">
      {isLoading && !errorMessage ? (
        <LoadingScreen />
      ) : (
        <div className="flex flex-row gap-[32px]">
          {/* species prediction list */}
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

          {/* selected species info section */}
          {selectedSpecies && (
            <motion.div
              className="flex flex-col gap-[16px]"
              key={selectedSpecies.class}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <img
                className="w-[200px] h-[200px] rounded-[16px]"
                src={selectedSpecies.image_url}
                alt={selectedSpecies.class}
              />

              <article className="prose">
                <h2>{selectedSpecies.class}</h2>
                <h3 className="text-neutral-200">
                  {selectedSpecies.scientific_name}
                </h3>
                <p>{selectedSpecies.appearance}</p>
                <p>{selectedSpecies.habitat}</p>
              </article>

              <div className="flex justify-start">
                <button
                  className="btn btn-primary"
                  onClick={handleConfirmation}
                >
                  Confirm Species
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
      {errorMessage && <ErrorScreen message={errorMessage} />}
    </div>
  );
}
