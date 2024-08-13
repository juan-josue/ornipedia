import React, { useEffect, useState } from "react";
import predictionRequest from "../../services/predictionRequest";
import speciesDescriptionRequest from "../../services/speciesDescriptionRequest";

export default function SpeciesSelector({ imageUrl, onConfirmation }) {
  const [speciesData, setSpeciesData] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
            return { ...prediction, description };
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
    <div>
      {isLoading ? (
        <div>
          "Predicting species..."
          <img src={imageUrl} width={20} height={20} alt="bird species" />
        </div>
      ) : (
        <ul>
          {speciesData.map((species) => (
            <li
              key={species.class}
              onClick={() => handleSpeciesSelect(species)}
            >
              {species.class}
            </li>
          ))}
        </ul>
      )}

      {selectedSpecies && (
        <div>
          <h2>{selectedSpecies.class}</h2>
          <p>{selectedSpecies.description}</p>
          <button onClick={handleConfirmation}>Confirm Species</button>
        </div>
      )}
    </div>
  );
}
