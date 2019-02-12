import "jest-dom/extend-expect";
import RadialRender from "../package-publish/RadialRender";
import React from "react";
import {
  render,
  waitForElement,
  fireEvent,
  flushEffects
} from "react-testing-library";
import "@babel/polyfill";

const originalConsoleError = console.error;

console.error = message => {
  if (/(Failed prop type.*`r`)/.test(message)) {
    throw new Error("missing r prop");
  }

  if (/(Failed prop type.*`components`)/.test(message)) {
    throw new Error("missing components prop");
  }

  //originalConsoleError(message);
};

test("Should console.error when missing sides prop", () => {
  expect(() => <RadialRender components={[]} />).toThrowError("missing r prop");
});

test("Should console.error when missing sides prop", () => {
  expect(() => <RadialRender r={50} />).toThrowError("missing components prop");
});

test("should render the qty of components passed to the components props", () => {
  const testChildren = [
    <h1 data-testid="test-child">1</h1>,
    <h1 data-testid="test-child">2</h1>,
    <h1 data-testid="test-child">3</h1>,
    <h1 data-testid="test-child">4</h1>,
    <h1 data-testid="test-child">5</h1>,
    <h1 data-testid="test-child">6</h1>
  ];

  const { queryAllByTestId } = render(
    <RadialRender r={50} components={testChildren} />
  );

  let tags = queryAllByTestId(/test-child/);
  expect(tags.length).toBe(6);
});

test("container should be wide enough to contain all elements", async () => {
  const testChildren = [
    <div style={{ width: "20px" }}>c</div>,
    <div style={{ width: "20px" }}>c</div>,
    <div style={{ width: "20px" }}>c</div>,
    <div style={{ width: "20px" }}>c</div>,
    <div style={{ width: "20px" }}>c</div>,
    <div style={{ width: "20px" }}>c</div>,
    <div style={{ width: "20px" }}>c</div>,
    <div style={{ width: "20px" }}>c</div>
  ];

  const { container } = render(
    <RadialRender r={50} components={testChildren} />
  );
  flushEffects();

  expect(container.childNodes[0].style.width).toBe("120px");
});
