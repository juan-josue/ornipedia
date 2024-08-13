import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ImageUpload from "./ImageUpload";
import SelectSpecies from "./SelectSpecies";
import Location from "./Location";
import SelectDate from "./SelectDate";
import ReviewSighting from "./ReviewSighting";

import { reportSighting } from "../../services/sightings";

export default function IdentificationFlow() {
  const navigate = useNavigate();

  const [step, setStep] = useState("IMAGE UPLOAD");
  const [imageUrl, setImageUrl] = useState("");
  const [speciesClass, setSpeciesClass] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [date, setDate] = useState(new Date());

  const handleImageUpload = (url) => {
    setImageUrl(url);
    setStep("SELECT SPECIES");
  };

  const handleSpeciesConfirmation = (species) => {
    setSpeciesClass(species);
    setStep("SELECT LOCATION");
  };

  const handleLocationConfirmation = (coordinates) => {
    setCoordinates(coordinates);
    setStep("SELECT DATE");
  };

  const handleDateConfirmation = (date) => {
    setDate(date);
    setStep("REVIEW ENTRY");
  };

  const handleSightingConfirmation = () => {
    reportSighting({
      imageUrl,
      speciesClass,
      coordinates,
      date,
    });
    navigate('/dashboard')
  };

  switch (step) {
    case "IMAGE UPLOAD":
      return <ImageUpload onImageUrl={handleImageUpload} />;
    case "SELECT SPECIES":
      return (
        <SelectSpecies imageUrl={imageUrl} onConfirmation={handleSpeciesConfirmation} />
      );
    case "SELECT LOCATION":
      return (
        <Location
          speciesClass={speciesClass}
          onConfirmation={handleLocationConfirmation}
        />
      );
    case "SELECT DATE":
      return <SelectDate onConfirmation={handleDateConfirmation} />;
    case "REVIEW ENTRY":
      return (
        <ReviewSighting
          sightingData={{
            imageUrl,
            speciesClass,
            coordinates,
            date,
          }}
          onConfirmation={handleSightingConfirmation}
        />
      );
    default:
      return <div>Something went wrong on our side...</div>;
  }
}
