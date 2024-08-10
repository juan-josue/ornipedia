import React, { useEffect, useState } from "react";

import predictionRequest from "../../services/predictionRequest";

export default function SelectSpecies({ imageUrl, onSelect }) {
  const [speciesPredictions, setSpeciesPredictions] = useState([]);

  const handleSelect = (selectedSpecies) => {
    onSelect(selectedSpecies);
  }

  useEffect(() => {
    const fetchSpeciesPredictions = async () => {
      try {
        const data = await predictionRequest(imageUrl);
        console.log("Fetched species predictions: ", data);
        setSpeciesPredictions(data);
      } catch (error) {
        console.error("Error fetching species predictions:", error);
      }
    };

    if (imageUrl) {
      fetchSpeciesPredictions();
    }
  }, [imageUrl]);

  return <div>{speciesPredictions && speciesPredictions.map((prediction, index) => {
    return <div key={index} onClick={() => handleSelect(prediction.class)}>{ "species: " + prediction.class }</div>
  })}</div>;
}
