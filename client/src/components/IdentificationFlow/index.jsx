import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import ImageUpload from "./ImageUpload";
import SelectSpecies from "./SelectSpecies";
import Location from "./Location";
import SelectDate from "./SelectDate";
import ReviewSighting from "./ReviewSighting";
import IdentificationStepsBar from "./IdentificationStepsBar";
import ErrorScreen from "../ErrorScreen";

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
    try {
      reportSighting({
        imageUrl,
        speciesClass,
        coordinates,
        date,
      });
      navigate("/dashboard");
    } catch (error) {
      setStep("ERROR");
    }
  };

  const renderStep = () => {
    switch (step) {
      case "IMAGE UPLOAD":
        return <ImageUpload onImageUrl={handleImageUpload} />;
      case "SELECT SPECIES":
        return (
          <SelectSpecies
            imageUrl={imageUrl}
            onConfirmation={handleSpeciesConfirmation}
          />
        );
      case "SELECT LOCATION":
        return (
          <Location
            speciesClass={speciesClass}
            onConfirmation={handleLocationConfirmation}
          />
        );
      case "SELECT DATE":
        return (
          <SelectDate
            speciesClass={speciesClass}
            onConfirmation={handleDateConfirmation}
          />
        );
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
        return (
          <div className="flex h-full w-full items-center justify-center">
            <ErrorScreen
              message={
                "Something went wrong when reporting the sighting, please try again later."
              }
            />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <div className="flex p-[32px] justify-center items-center bg-base-100 w-[300px] border-r-2 border-secondary">
        <IdentificationStepsBar currentStep={step} />
      </div>
      <motion.div
        className="w-full p-[32px]"
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {renderStep()}
      </motion.div>
    </div>
  );
}
