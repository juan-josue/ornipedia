import axios from "axios";

export default async function predictionRequest(image_url) {
  try {
    const response = await axios.post("/predict", {
      image_url,
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};
