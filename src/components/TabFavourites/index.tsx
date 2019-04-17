import * as React from "react";
import { Joke } from "../Joke";

export const TabFavourites = ({
  favourites,
  removeFromFavourites,
  toggleTimer,
  timerOn
}) => (
  <div>
    <button className="btn" onClick={toggleTimer}>
      {timerOn ? "Stop" : "Start"} ⏰ (adds joke to favourite)
    </button>
    {favourites.map(favourite => (
      <Joke
        key={favourite.id}
        joke={favourite}
        onClick={removeFromFavourites(favourite)}
        buttonText="✕"
      />
    ))}
  </div>
);
