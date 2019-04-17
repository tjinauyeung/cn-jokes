import * as React from "react";

export const TabFavourites = ({
  favourites,
  removeFromFavourites,
  toggleTimer
}) => (
  <div>
    <button onClick={toggleTimer}>⏰</button>
    {favourites.map(favourite => (
      <div key={favourite.id}>
        {favourite.joke}
        <button onClick={removeFromFavourites(favourite)}>
          remove from favourites
        </button>
      </div>
    ))}
  </div>
);
