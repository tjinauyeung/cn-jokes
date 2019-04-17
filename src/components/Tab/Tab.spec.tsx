import * as React from "react";
import { shallow } from "enzyme";
import { Tab } from "./index";

const makeComponent = props => shallow(<Tab {...props}>{props.children}</Tab>);

const spy = jest.fn();
const component = makeComponent({
  active: true,
  onClick: spy
});

describe("Tab", () => {
  it("renders a button", () => {
    expect(component.is("button")).toBe(true);
  });

  it("renders props.children", () => {
    const children = <div>Tab</div>;
    const component = makeComponent({ children });
    expect(component.contains(children)).toBe(true);
  });

  it("calls onClick function when clicked", () => {
    expect(spy).not.toHaveBeenCalled();
    component.find("button").simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});
