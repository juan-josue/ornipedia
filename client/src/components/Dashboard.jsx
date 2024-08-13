import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { useNavigate } from "react-router-dom";

import { getAllSightings } from "../services/sightings";
import { signout } from "../services/auth";

export default function Dashboard() {
  const navigate = useNavigate();

  const [sightings, setSightings] = useState([]);
  const [viewState, setViewState] = useState({
    latitude: 14.839279,
    longitude: -89.142483,
    zoom: 1,
  });

  const handleIdentifySpecies = () => {
    navigate("/identification-flow");
  };

  const handleSignOut = () => {
    signout();
    navigate("/");
  }

  useEffect(() => {
    const fetchSightings = async () => {
      const data = await getAllSightings();
      if (data) {
        console.log("fetched user sightings: ", data);
        setSightings(data);
      } else {
        console.log("Failed to fetch user sightings");
      }
    };
    fetchSightings();
  }, []);

  return (
    <div>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      >
        {sightings.map((sighting) => (
          <Marker
            key={sighting.id}
            latitude={sighting.latitude}
            longitude={sighting.longitude}
          >
          </Marker>
        ))}
      </Map>
      <button onClick={handleIdentifySpecies}>Report A Sighting</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
