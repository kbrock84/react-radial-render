import "jest-dom/extend-expect";
import RadialRender from "./RadialRender";
import React from "react";

const originalConsoleError = console.error;

console.error = message => {
  if (/(Failed prop type)/.test(message)) {
    console.log(message);
    throw new Error(message);
  }
  originalConsoleError(message);
};
test("Should console.error when missing sides prop", () => {
  expect(() => <RadialRender />).toThrowError();
});
