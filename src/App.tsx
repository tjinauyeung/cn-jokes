import * as React from "react";
import { useState, useEffect } from "react";
import { JokeService } from "./services/JokeService";
import { TabJokes } from "./components/TabJokes";
import { TabFavourites } from "./components/TabFavourites";
import { useFavouritesTimer } from "./hooks/useFavouritesTimer";

const TIMER_INTERVAL = 1000;
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

  const addToFavourites = joke => e => {
    jokeService.addToFavourites(joke).then(setFavourites);
  };

  const removeFromFavourites = joke => e => {
    jokeService.removeFromFavourites(joke).then(setFavourites);
  };

  const loadJokes = e => {
    jokeService.getAll().then(list => setJokes([...jokes, ...list]));
  };

  const toTab = tab => e => setActiveTab(tab);
  const isActive = tab => activeTab === tab;

  const [timerOn, setTimerOn]: any = useFavouritesTimer(
    () => {
      jokeService
        .getRandom()
        .then(jokeService.addToFavourites)
        .then(setFavourites);
    },
    TIMER_INTERVAL,
    favourites.length
  );

  const toggleTimer = e => setTimerOn(!timerOn);

  return (
    <div className="wrapper">
      <h1>Chuck Norris</h1>
      <button onClick={toTab(TAB_JOKES)}>Jokes</button>
      <button onClick={toTab(TAB_FAVOURITES)}>Fav. jokes</button>
      {isActive(TAB_JOKES) && (
        <TabJokes
          jokes={jokes}
          loadJokes={loadJokes}
          addToFavourites={addToFavourites}
        />
      )}
      {isActive(TAB_FAVOURITES) && (
        <TabFavourites
          favourites={favourites}
          removeFromFavourites={removeFromFavourites}
          toggleTimer={toggleTimer}
        />
      )}
    </div>
  );
};
