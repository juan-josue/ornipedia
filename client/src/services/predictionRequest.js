import axios from "axios";

export default async function predictionRequest(image_url) {
  try {
    const response = await axios.post("/predict", {
      image_url,
    });
    return response.data;
  } catch (error) {
    // Handle http errors
    if (error.response) {
      const status = error.response.status;

      if (status === 400) {
        console.error(
          "Bad Request, invalid or no url provided: ",
          error.response.data.error
        );
      } else if (status === 404) {
        console.error(
          "Could not predict species from url ",
          error.response.data.error
        );
      } else if (status === 500) {
        console.error("Server Error: ", error.response.data.error);
      } else {
        console.error("Error predicting species:", error.response.data.error);
      }
    } else {
      // Handle errors made making the request
      console.error("Error setting up the prediction request:", error.message);
    }

    throw error;
  }
}
