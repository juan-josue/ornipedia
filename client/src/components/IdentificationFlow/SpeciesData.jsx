import React, { useEffect, useState } from "react";

import speciesDescriptionRequest from "../../services/speciesDescriptionRequest";

export default function SpeciesData({ speciesClass, onConfirmation }) {
  const [speciesDescription, setSpeciesDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const handleConfirmation = () => {
    onConfirmation();
  }

  useEffect(() => {
    const fetchSpeciesDescription = async () => {
      try {
        const data = await speciesDescriptionRequest(speciesClass);
        console.log("Fetched species description: ", data);
        setSpeciesDescription(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching species description:", error);
      }
    };
    fetchSpeciesDescription();
  }, [speciesClass]);

  return (
    <div>
      <div>{speciesClass}</div>
      {loading && <div>{"Loading species description..."}</div>}
      {!loading && <div>{speciesDescription}</div>}
      <button onClick={() => handleConfirmation()}>Confirm Species</button>
    </div>
  );
}
