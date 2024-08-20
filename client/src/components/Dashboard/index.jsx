import React from "react";

import Navbar from "./Navbar";
import SightingMap from "./SightingMap";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />

      <div className="flex flex-row h-full flex-grow">
        <SightingMap />
      </div>
    </div>
  );
}
