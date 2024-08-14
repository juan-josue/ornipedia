import React, { useState } from "react";

export default function ImageUpload({ onImageUrl }) {
  const [imageUrl, setImageUrl] = useState(
    "https://miro.medium.com/v2/resize:fit:1400/0*eJ-vUsPwRRC_1dHS.jpg"
  );

  const handleSubmit = () => {
    if (imageUrl) {
      onImageUrl(imageUrl);
    }
  };

  return (
    <div className="flex flex-col gap-[64px] bg-base-100 h-full justify-center items-center">
      <h1 className="uppercase">Enter your bird photo url</h1>
      <div className="join">
        <input
          type="text"
          placeholder="Image URL"
          className="input w-[300px] bg-base-200 rounded-l-full px-[32px] join-item"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button className="btn btn-primary join-item rounded-r-full" onClick={handleSubmit}>
          Predict Species
        </button>
      </div>
    </div>
  );
}
