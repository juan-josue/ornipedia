import React from "react";

export default function LifeList({ sightings }) {
  function getLifeList(species) {
    const uniqueSpecies = new Set();

    species.forEach((species) => {
      uniqueSpecies.add(species.species_class);
    });

    return Array.from(uniqueSpecies).sort();
  }

  return (
    <div className="flex flex-col w-full h-full p-[16px]">
      <article className="prose">
        <h3 className="text-neutral m-0">{`Life List`}</h3>
        <p className="text-secondary-200 m-0">{`${
          sightings && getLifeList(sightings).length
        } birds`}</p>
      </article>
      <ol className="overflow-y-scroll">
        {sightings &&
          getLifeList(sightings).map((species, index) => {
            return (
              <li key={index} className="border-b-2 border-secondary py-[16px]">
                <article className="prose">
                  <p className="text-neutral m-0">{species}</p>
                </article>
              </li>
            );
          })}
      </ol>
    </div>
  );
}
