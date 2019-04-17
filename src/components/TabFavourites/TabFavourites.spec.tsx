import * as React from "react";
import { shallow } from "enzyme";
import { TabFavourites } from "./index";
import { Joke } from "../Joke";

const spyRemoveFromFavourites = jest.fn();
const spyToggleTimer = jest.fn();

const makeComponent = ({
  favourites = [],
  removeFromFavourites = spyRemoveFromFavourites,
  toggleTimer = spyToggleTimer,
  timerOn = true
} = {}) =>
  shallow(
    <TabFavourites
      favourites={favourites}
      removeFromFavourites={removeFromFavourites}
      toggleTimer={toggleTimer}
      timerOn={timerOn}
    />
  );

const component = makeComponent();

describe("TabFavourites", () => {
  it("renders list of favourites from props", () => {
    const component = makeComponent({ favourites: [{ id: 1 }, { id: 2 }] });
    expect(component.find(Joke).length).toBe(2);
  });

  it("calls toggleTimer when clicked", () => {
    expect(spyToggleTimer).not.toHaveBeenCalled();
    component.find(".btn").simulate("click");
    expect(spyToggleTimer).toHaveBeenCalled();
  });

  it("renders stop if timerOn is true", () => {
    expect(
      component
        .find(".btn")
        .text()
        .toLowerCase()
        .includes("stop")
    ).toBe(true);
  });

  it("renders start if timerOn is false", () => {
    const component = makeComponent({ timerOn: false });
    expect(
      component
        .find(".btn")
        .text()
        .toLowerCase()
        .includes("start")
    ).toBe(true);
  });
});
