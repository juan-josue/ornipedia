import React, { useState } from "react";

import ImageUpload from "./ImageUpload";
import SelectSpecies from "./SelectSpecies";
import SpeciesData from "./SpeciesData";
import Location from "./Location";
import SelectDate from "./SelectDate";

export default function IdentificationFlow() {
  const [step, setStep] = useState('IMAGE UPLOAD');
  const [imageUrl, setImageUrl] = useState('');
  const [speciesClass, setSpeciesClass] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [date, setDate] = useState(new Date());

  const handleImageUpload = (url) => {
    setImageUrl(url);
    setStep('SELECT SPECIES');
  };

  const handleSpeciesSelect = (species) => {
    setSpeciesClass(species);
    setStep('SPECIES DATA');
  };

  const handleSpeciesConfirmation = () => {
    setStep('SELECT LOCATION');
  }

  const handleLocationConfirmation = (coordinates) => {
    setCoordinates(coordinates);
    setStep('SELECT DATE')
  }

  const handleDateConfirmation = (date) => {
    setDate(date);
    setStep('REVIEW ENTRY');
  }

  switch (step) {
    case 'IMAGE UPLOAD':
      return <ImageUpload onImageUrl={handleImageUpload} />;
    case 'SELECT SPECIES':
      return <SelectSpecies imageUrl={imageUrl} onSelect={handleSpeciesSelect} />;
    case 'SPECIES DATA':
      return <SpeciesData speciesClass={speciesClass} onConfirmation={handleSpeciesConfirmation} />;
    case 'SELECT LOCATION':
      return <Location speciesClass={speciesClass} onConfirmation={handleLocationConfirmation} />;
    case 'SELECT DATE':
      return <SelectDate onConfirmation={handleDateConfirmation} />;
    case 'REVIEW ENTRY':
      return <div>{step}</div>;
    default:
      return <div>Something went wrong on our side...</div>;
  }
}
