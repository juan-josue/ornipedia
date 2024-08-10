import axios from "axios";

export default async function predictionRequest(image_url) {
  try {
    const response = await axios.post("/predict", {
      image_url,
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};
