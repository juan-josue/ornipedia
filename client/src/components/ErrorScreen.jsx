import React from "react";

export default function ErrorScreen({ message }) {
  return (
    <div className="flex flex-col items-center">
      <article className="prose">
        <h3 className="text-5xl">Sorry, that wasn't supposed to happen!</h3>
        <p className="text-md text-neutral">{message}</p>
      </article>
    </div>
  );
}
