import React, { useState } from "react";

import ImageUpload from "./ImageUpload";
import SelectSpecies from "./SelectSpecies";
import SpeciesData from "./SpeciesData";
import Location from "./Location";

export default function IdentificationFlow() {
  const [step, setStep] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [speciesClass, setSpeciesClass] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const handleImageUpload = (url) => {
    setImageUrl(url);
    setStep(1);
  };

  const handleSpeciesSelect = (species) => {
    setSpeciesClass(species);
    setStep(2);
  };

  const handleSpeciesConfirmation = () => {
    setStep(3);
  }

  const handleLocationConfirmation = (coordinates) => {
    setCoordinates(coordinates);
    setStep(4)
  }

  switch (step) {
    case 0:
      return <ImageUpload onImageUrl={handleImageUpload} />;
    case 1:
      return <SelectSpecies imageUrl={imageUrl} onSelect={handleSpeciesSelect} />;
    case 2:
      return <SpeciesData speciesClass={speciesClass} onConfirmation={handleSpeciesConfirmation} />;
    case 3:
      return <Location speciesClass={speciesClass} onConfirmation={handleLocationConfirmation} />;
    case 4:
      return <div>{step}</div>;
    default:
      return <div>{step}</div>;
  }
}
