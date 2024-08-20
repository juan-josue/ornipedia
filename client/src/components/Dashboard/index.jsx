import React, { useState, useEffect } from "react";

import Navbar from "./Navbar";
import SightingMap from "./SightingMap";

import { getAllSightings } from "../../services/sightings";

export default function Dashboard() {
  const [dashboardDisplay, setDashboardDisplay] = useState("map");
  const [sightings, setSightings] = useState([]);

  const handleToggle = () => {
    setDashboardDisplay((prevDisplay) =>
      prevDisplay === "map" ? "gallery" : "map"
    );
  };

  useEffect(() => {
    const fetchSightings = async () => {
      const data = await getAllSightings();
      if (data) {
        setSightings(data);
      }
    };
    fetchSightings();
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar onToggle={handleToggle} />
      <div className="flex flex-row h-full flex-grow">
        {dashboardDisplay === "map" && <SightingMap sightings={sightings} />}
        {dashboardDisplay === "gallery" && <div>Gallery Page</div>}
      </div>
    </div>
  );
}
