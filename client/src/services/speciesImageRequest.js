import axios from "axios";

export default async function speciesImageRequest(species_class) {
  try {
    const response = await axios.get("/species-data/image", {
      params: { species_class },
      responseType: 'blob',
    });
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching species image:", error.message);
    throw error;
  }
}
