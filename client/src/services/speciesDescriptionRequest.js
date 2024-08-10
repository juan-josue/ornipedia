import axios from "axios";

export default async function speciesDescriptionRequest(species_class) {
  try {
    const response = await axios.get("/species-data/description", {
        params: { species_class }
      });
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};
