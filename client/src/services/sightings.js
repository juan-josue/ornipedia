import { supabase } from "./supabaseClient";

function getUserID() {
  return localStorage.getItem("uid");
}

export async function reportSighting(sightingData) {
  const {
    speciesClass,
    coordinates: { latitude, longitude },
    date,
  } = sightingData;
  const uid = getUserID();

  const { data, error } = await supabase.from("sightings").insert({
    species_class: speciesClass,
    latitude,
    longitude,
    date,
    user_id: uid,
  }).select();

  if (error) {
    console.log(error.message);
  } else {
    console.log("Reported sighting: ", data);
    return data;
  }
}

export async function getAllSightings() {
  const uid = getUserID();

  const { data, error } = await supabase
    .from("sightings")
    .select("*")
    .eq("user_id", uid);

  if (error) {
    console.log(error.message);
  } else {
    return data;
  }
}
