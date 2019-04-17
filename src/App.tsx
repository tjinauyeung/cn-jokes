import * as React from "react";
import { useState, useEffect } from "react";
import { JokeService } from "./services/JokeService";

const TAB_JOKES = "tab_jokes";
const TAB_FAVOURITES = "tab_favourites";

export const App = ({ service }) => {
  const jokeService: JokeService = service || new JokeService();
  const [activeTab, setActiveTab] = useState(TAB_JOKES);
  const [jokes, setJokes] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    jokeService.getFavourites().then(setFavourites);
  }, []);

  const loadJokes = e => {
    jokeService.getAll().then(list => setJokes([...jokes, ...list]));
  };

  const addToFavourites = joke => e => {
    jokeService.addToFavourites(joke).then(setFavourites);
  };

  const removeFromFavourites = joke => e => {
    jokeService.removeFromFavourites(joke).then(setFavourites);
  };

  const isActive = tab => activeTab === tab;
  const toTab = tab => e => setActiveTab(tab);

  return (
    <div className="wrapper">
      <h1>Chuck Norris</h1>
      <button onClick={toTab(TAB_JOKES)}>Jokes</button>
      <button onClick={toTab(TAB_FAVOURITES)}>Fav. jokes</button>
      {isActive(TAB_JOKES) && (
        <div>
          <ul>
            {jokes.map(joke => (
              <li key={joke.id}>
                {joke.joke}
                <button onClick={addToFavourites(joke)}>
                  add to favourites
                </button>
              </li>
            ))}
          </ul>
          <button onClick={loadJokes}>load jokes...</button>
        </div>
      )}
      {isActive(TAB_FAVOURITES) && (
        <div>
          {favourites.map(favourite => (
            <li key={favourite.id}>
              {favourite.joke}
              <button onClick={removeFromFavourites(favourite)}>
                remove from favourites
              </button>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};
