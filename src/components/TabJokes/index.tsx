import * as React from "react";
import { Joke } from "../Joke";

export const TabJokes = ({
  jokes,
  addToFavourites,
  removeFromFavourites,
  loadJokes,
  favourites
}) => {
  const isFavourite = jokeId => favourites.some(joke => joke.id === jokeId);
  return (
    <div>
      {jokes.map(joke => (
        <Joke
          key={joke.id}
          joke={joke}
          buttonText={isFavourite(joke.id) ? "❤️" : "🖤"}
          toolTip={
            isFavourite(joke.id)
              ? "Remove from favourites"
              : "Add to favourites"
          }
          onClick={
            isFavourite(joke.id)
              ? removeFromFavourites(joke)
              : addToFavourites(joke)
          }
        />
      ))}
      <button className="btn" onClick={loadJokes}>
        {jokes.length ? "Load more epic jokes" : "Load epic jokes"} 😁
      </button>
    </div>
  );
};
