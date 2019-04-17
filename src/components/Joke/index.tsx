import * as React from "react";
import "./index.scss";

export const Joke = ({ joke, onClick, buttonText, toolTip = "" }) => (
  <div className="joke">
    {joke.joke}
    <button title={toolTip} className="btn btn--joke" onClick={onClick}>
      {buttonText}
    </button>
  </div>
);
