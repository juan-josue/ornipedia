import React, { useState } from "react";

import ImageUpload from "./ImageUpload";
import SelectSpecies from "./SelectSpecies";

export default function IdentificationFlow() {
  const [step, setStep] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = (url) => {
    console.log('user submitted url: ', url);
    setImageUrl(url);
    setStep(1);
  };

  switch (step) {
    case 0:
      return <ImageUpload onImageUrl={handleImageUpload} />;
    case 1:
      return <SelectSpecies imageUrl={imageUrl} />;
    case 2:
      return <div>{step}</div>;
    case 3:
      return <div>{step}</div>;
    case 4:
      return <div>{step}</div>;
    default:
      return <div>{step}</div>;
  }
}
