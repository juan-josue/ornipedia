import React, { useEffect, useState } from "react";
import predictionRequest from "../../services/predictionRequest";
import speciesDescriptionRequest from "../../services/speciesDescriptionRequest";

export default function SpeciesSelector({ imageUrl, onConfirmation }) {
  const [speciesData, setSpeciesData] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  useEffect(() => {
    const fetchSpeciesData = async () => {
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
      } catch (error) {
        console.error("Error fetching species data:", error);
      }
    };

    if (imageUrl) {
      fetchSpeciesData();
    }
  }, [imageUrl]);

  const handleSpeciesSelect = (species) => {
    setSelectedSpecies(species);
  };

  const handleConfirmation = () => {
    onConfirmation(selectedSpecies.class);
  };

  return (
    <div>
      <ul>
        {speciesData.map((species) => (
          <li key={species.class} onClick={() => handleSpeciesSelect(species)}>
            {species.class}
          </li>
        ))}
      </ul>
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
