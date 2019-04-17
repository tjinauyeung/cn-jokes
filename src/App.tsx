import * as React from "react";
import { useState } from "react";

const TAB_JOKES = "tab_jokes";
const TAB_FAVOURITES = "tab_favourites";

export const App = () => {
  const [activeTab, setActiveTab] = useState(TAB_JOKES);

  const toTab = tab => e => {
    setActiveTab(tab);
  };

  const isActive = tab => {
    return activeTab === tab;
  };

  return (
    <div className="wrapper">
      <h1>Chuck Norris</h1>
      <button onClick={toTab(TAB_JOKES)}>Jokes</button>
      <button onClick={toTab(TAB_FAVOURITES)}>Fav. jokes</button>
      {isActive(TAB_JOKES) && <div>List of jokes</div>}
      {isActive(TAB_FAVOURITES) && <div>List of favourite jokes</div>}
    </div>
  );
};
