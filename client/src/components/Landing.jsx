import React from "react";
import { useNavigate } from "react-router-dom";

import heroImage from "../assets/images/heron_hero.jpeg";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-[64px] max-w-[1400px] min-h-screen px-[32px] m-auto mb-[64px] overflow-x-hidden bg-base-100">
      {/* hero bann*er */}
      <section>
        <div className="flex justify-between items-end mt-[16px]">
          <p className="text-2xl text-neutral font-bold">Ornipedia</p>
          <p className="text-md text-secondary">
            A project by Juan Gutierrez Moreno
          </p>
        </div>
        <div
          className="flex flex-col gap-[32px] h-[600px] bg-base-100 rounded-[16px] mt-[16px] p-[64px] pt-[128px]"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "top right",
          }}
        >
          <article className="prose">
            <h1 className="text-7xl m-0 text-neutral">
              Classify your bird in seconds.
            </h1>
            <p className="text-neutral">
              Next-level birding starts here. Our AI is trained on 500+ species.
            </p>
          </article>
          <button
            className="btn btn-primary w-[200px] text-xl shadow-xl"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
        </div>
      </section>

      {/* info text */}
      <section>
        <div className="flex justify-between items-center">
          <article className="prose w-1/2">
            <h2 className="text-5xl">
              Bird watching <br /> made easy
            </h2>
          </article>
          <article className="prose w-1/2">
            <p className="text-xl">
              Identify birds instantly, learn fascinating facts about them, and
              track your sightings on an interactive map. Ornipedia's AI-powered
              platform is your ultimate birding companion.
            </p>
          </article>
        </div>
      </section>

      {/* feature cards */}
      <section>
        <div className="grid grid-rows-2 grid-cols-2 gap-[32px] max-h-[700px]">
          <div className="card card-compact bg-secondary shadow-xl">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1685826660218-4f8eb78e81e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Oriole"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Rapid Bird Identification</h2>
              <p>
                Our machine learning model swiftly identifies bird species from
                a photo, making birding easier and more enjoyable.
              </p>
            </div>
          </div>

          <div className="card card-compact row-span-2 bg-secondary shadow-xl">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1517362087576-65980c8a9e71?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Track your journey</h2>
              <p>
                Map your birdwatching adventures with our interactive map
                feature. Easily pinpoint and revisit your favorite spots.
              </p>
            </div>
          </div>

          <div className="card card-compact bg-secondary shadow-xl">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1718836030038-09b57d47f7bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Build Your Bird Collection</h2>
              <p>
                Create a visual library of your bird sightings. Save, share, and
                revisit your favorite photos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* gif */}
      <section>
        <div className="flex gap-[32px] items-center">
          <div
            className="flex flex-co gap-[32px] w-3/5 h-[350px] bg-base-100 rounded-[16px]"
            style={{
              backgroundImage: `url(https://www.padstowsealifesafaris.co.uk/wp-content/uploads/gannet-seabird.gif)`,
              backgroundSize: "cover",
              backgroundPosition: "top right",
            }}
          ></div>
          <article className="prose w-2/5">
            <h2 className="text-5xl">Bird watching made easy</h2>
            <p>
              Identify birds instantly, learn fascinating facts about them, and
              track your sightings on an interactive map. Ornipedia's AI-powered
              platform is your ultimate birding companion.
            </p>
            <button
              className="btn btn-neutral w-[200px] text-xl shadow-xl"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Try It Out
            </button>
          </article>
        </div>
      </section>
    </div>
  );
}
