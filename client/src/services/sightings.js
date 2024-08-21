import { supabase } from "./supabaseClient";

function getUserID() {
  return localStorage.getItem("uid");
}

export async function reportSighting(sightingData) {
  const {
    imageUrl,
    speciesClass,
    coordinates: { latitude, longitude },
    date,
  } = sightingData;
  const uid = getUserID();

  const { data, error } = await supabase
    .from("sightings")
    .insert({
      species_class: speciesClass,
      latitude,
      longitude,
      date,
      user_id: uid,
      image_url: imageUrl,
    })
    .select();

    if (error) {
      console.error("Error reporting sighting:", error.message);
      throw new Error(`Error reporting sighting: ${error.message}`);
    } 
    
    return data;
}

export async function getAllSightings() {
  const uid = getUserID();

  const { data, error } = await supabase
    .from("sightings")
    .select("*")
    .eq("user_id", uid);

    if (error) {
      console.error("Error fetching user sightings:", error.message);
      throw new Error(`Error fetching user sightings: ${error.message}`);
    } 
    
    return data;
}
