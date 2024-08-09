import React, { useState } from 'react'

export default function ImageUpload({ onImageUrl }) {
  const [imageUrl, setImageUrl] = useState('https://miro.medium.com/v2/resize:fit:1400/0*eJ-vUsPwRRC_1dHS.jpg');

  const handleSubmit = () => {
    if (imageUrl) {
        onImageUrl(imageUrl);
    }
  }

  return (
    <div>
        <input
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit URL</button>
    </div>
  )
}
