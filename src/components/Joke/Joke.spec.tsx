import * as React from "react";
import { shallow } from "enzyme";
import { Joke } from "./index";

const makeComponent = props => shallow(<Joke {...props} />);

const spy = jest.fn();
const expectedJoke = "foo";
const expectedButtonText = "bar";

const component = makeComponent({
  joke: {
    id: "123",
    joke: expectedJoke
  },
  buttonText: expectedButtonText,
  onClick: spy
});

describe("Joke", () => {
  it("renders a div", () => {
    expect(component.is("div")).toBe(true);
  });

  it("renders joke from props", () => {
    expect(component.find(".joke span").text()).toBe(expectedJoke);
  });

  it("renders button text from props", () => {
    expect(component.find(".joke button").text()).toBe(expectedButtonText);
  });

  it("calls onClick function when button is clicked", () => {
    expect(spy).not.toHaveBeenCalled();
    component.find(".joke button").simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});
