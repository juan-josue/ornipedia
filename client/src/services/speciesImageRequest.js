import axios from "axios";

export default async function speciesImageRequest(species_class) {
  try {
    const response = await axios.get("/species-data/image", {
      params: { species_class },
      responseType: "blob",
    });
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  } catch (error) {
    // Handle http errors
    if (error.response) {
      const status = error.response.status;

      if (status === 400) {
        console.error(
          "Bad Request, no species class provided: ",
          error.response.data.error
        );
      } else if (status === 404) {
        console.error("Species not Found: ", error.response.data.error);
      } else if (status === 500) {
        console.error("Server Error: ", error.response.data.error);
      } else {
        console.error("Error fetching image:", error.response.data.error);
      }
    } else {
      // Handle errors made making the request
      console.error("Error setting up the image request:", error.message);
    }

    throw error;
  }
}
