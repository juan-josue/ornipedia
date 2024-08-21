import React from "react";
import { useNavigate } from "react-router-dom";

function SightingListItem({ sighting, onSelectSighting }) {
  return (
    <li
      onClick={() => {
        onSelectSighting(sighting);
      }}
      className="flex flex-row justify-between hover:bg-secondary hover:cursor-pointer border-b-2 border-secondary py-[16px]"
    >
      <article className="prose">
        <p className="text-neutral m-0">{sighting.species_class}</p>
        <p className="text-secodary m-0">
          {new Date(sighting.date).toLocaleDateString()}
        </p>
      </article>
      
      <img
        className="mask mask-square"
        src={sighting.image_url}
        alt="sighting"
        width={64}
        height={64}
      />
    </li>
  );
}

export default function SightingList({ sightings, onSelectSighting }) {
  const navigate = useNavigate();

  const handleIdentifySpecies = () => {
    navigate("/identification-flow");
  };

  return (
    <div
      style={{ transform: "translateY(-50%)" }}
      className="absolute flex flex-col gap-[16px] w-[300px] right-[16px] top-[50%] p-[16px] rounded-md bg-base-100"
    >
      <article className="prose">
        <h3 className="text-neutral m-0">Sightings</h3>
        <p className="text-secondary-200 m-0">{`${
          sightings && sightings.length
        } sightings`}</p>
      </article>

      <ol className="max-h-[400px] overflow-y-scroll">
        {sightings.map((sighting) => {
          return (
            <SightingListItem
              key={sighting.id}
              onSelectSighting={onSelectSighting}
              sighting={sighting}
            />
          );
        })}
      </ol>

      <button className="btn btn-primary" onClick={handleIdentifySpecies}>
        Report A Sighting
      </button>
    </div>
  );
}
