import React from "react";

export default function IdentificationStepsBar({ currentStep }) {
  const stepNames = [
    "IMAGE UPLOAD",
    "SELECT SPECIES",
    "SELECT LOCATION",
    "SELECT DATE",
    "REVIEW ENTRY",
  ];

  const stepLabels = [
    "Image Upload",
    "Predict Species",
    "Location",
    "Date",
    "Confirm Sighting",
  ];

  const currentStepIndex = stepNames.indexOf(currentStep);

  return (
    <div>
      <ul className="steps steps-vertical">
        {stepNames.map((stepName, index) => {
          return <li key={index} className={`step ${index <= currentStepIndex ? 'step-primary' : ''}`}>{stepLabels[index]}</li>;
        })}
      </ul>
    </div>
  );
}
