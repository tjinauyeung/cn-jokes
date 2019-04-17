import * as React from "react";

export const TabJokes = ({ jokes, addToFavourites, loadJokes }) => {
  return (
    <div>
      {jokes.map(joke => (
        <div key={joke.id}>
          {joke.joke}
          <button onClick={addToFavourites(joke)}>add to favourites</button>
        </div>
      ))}
      <button onClick={loadJokes}>load jokes...</button>
    </div>
  );
};
