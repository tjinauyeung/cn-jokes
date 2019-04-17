import * as React from "react";
import { useState, useEffect, Fragment } from "react";
import { JokeService } from "./services/JokeService";
import { TabJokes } from "./components/TabJokes";
import { TabFavourites } from "./components/TabFavourites";
import { useFavouritesTimer } from "./hooks/useFavouritesTimer";
import { Tab } from "./components/Tab";

interface AppProps {
  service?: JokeService;
}

const TIMER_INTERVAL = 1000;
const TAB_JOKES = "tab_jokes";
const TAB_FAVOURITES = "tab_favourites";

export const App = ({ service }: AppProps) => {
  const jokeService = service || new JokeService();
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
    <Fragment>
      <h1 className="title">Chuck Norris</h1>
      <Tab active={isActive(TAB_JOKES)} onClick={toTab(TAB_JOKES)}>
        Jokes
      </Tab>
      <Tab active={isActive(TAB_FAVOURITES)} onClick={toTab(TAB_FAVOURITES)}>
        Fav. jokes
      </Tab>
      {isActive(TAB_JOKES) && (
        <TabJokes
          jokes={jokes}
          loadJokes={loadJokes}
          addToFavourites={addToFavourites}
          removeFromFavourites={removeFromFavourites}
          favourites={favourites}
        />
      )}
      {isActive(TAB_FAVOURITES) && (
        <TabFavourites
          favourites={favourites}
          removeFromFavourites={removeFromFavourites}
          toggleTimer={toggleTimer}
          timerOn={timerOn}
        />
      )}
    </Fragment>
  );
};
