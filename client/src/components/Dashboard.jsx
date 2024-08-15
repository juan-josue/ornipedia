import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { useNavigate } from "react-router-dom";
import { useRef, useCallback } from "react";

import Navbar from "./Navbar";

import { getAllSightings } from "../services/sightings";

export default function Dashboard() {
  const navigate = useNavigate();
  const mapRef = useRef();

  const [sightings, setSightings] = useState([]);
  const [viewState, setViewState] = useState({
    latitude: 14.839279,
    longitude: -89.142483,
    zoom: 3.5,
  });

  const handleIdentifySpecies = () => {
    navigate("/identification-flow");
  };

  const onSelectSighting = useCallback((latitude, longitude) => {
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      duration: 5000,
      zoom: 12,
    });
  }, []);

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

  console.log("rendered");

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-row h-full flex-grow">
        <div className="flex bg-base-100 w-[400px] border-r-2 border-secondary"></div>
        <div className="relative flex w-full h-full">
          {/* sighting map */}
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            className="absolute top-0 left-0 w-full h-full -z-10"
            mapStyle="mapbox://styles/mapbox/outdoors-v12"
          >
            {sightings.map((sighting) => (
              <Marker
                key={sighting.id}
                latitude={sighting.latitude}
                longitude={sighting.longitude}
                offsetLeft={-20}
                offsetTop={-10}
              ></Marker>
            ))}
          </Map>

          {/* sighting controls */}
          <div
            style={{ transform: "translateY(-50%)" }}
            className="absolute flex flex-col gap-[16px] w-[300px] right-[16px] top-[50%] p-[16px] rounded-md bg-base-100"
          >
            <article className="prose">
              <h3 className="text-neutral">Sightings</h3>
            </article>
            <ol className="max-h-[500px] overflow-y-scroll">
              {sightings &&
                sightings.map((sighting) => {
                  return (
                    <li
                      key={sighting.id}
                      className="hover:bg-secondary hover:cursor-pointer border-b-2 border-secondary py-[16px]"
                      onClick={() => {
                        onSelectSighting(sighting.latitude, sighting.longitude);
                      }}
                    >
                      <article className="prose">
                        <p className="text-neutral m-0">
                          {sighting.species_class}
                        </p>
                        <p className="text-secodary m-0">
                          {sighting.date.substring(0, 10)}
                        </p>
                      </article>
                    </li>
                  );
                })}
            </ol>

            <button className="btn btn-primary" onClick={handleIdentifySpecies}>
              Report A Sighting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
