import React, { useEffect, useState } from "react";

import predictionRequest from "../../services/predictionRequest";

export default function SelectSpecies({ imageUrl }) {
  const [speciesData, setSpeciesData] = useState(null);

  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        const data = await predictionRequest(imageUrl);
        console.log("Fetched species data: ", data);
        setSpeciesData(data);
      } catch (error) {
        console.error("Error fetching species data:", error);
      }
    };

    if (imageUrl) {
      fetchSpeciesData();
    }
  }, [imageUrl]);

  return (
    <div>{speciesData && <span> {speciesData.predicted_class} </span>}</div>
  );
}
