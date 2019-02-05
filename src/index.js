import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import RadialRender from "../package-publish/RadialRender";

const CircleBnt = props => {
  return (
    <div>
      <button
        style={{
          height: "30px",
          width: "30px",
          borderRadius: "15px",
          border: "none",
          backgroundColor: "#125ee1",
          color: "#fefefe"
        }}
      >
        {props.children}
      </button>
    </div>
  );
};

function App() {
  return (
    <div
      className="App"
      style={{ position: "absolute", left: "50px", top: "50px" }}
    >
      <RadialRender
        r={70}
        strokeWidth={2}
        components={[
          <CircleBnt>1</CircleBnt>,
          <CircleBnt>2</CircleBnt>,
          <CircleBnt>3</CircleBnt>,
          <CircleBnt>4</CircleBnt>,
          <CircleBnt>5</CircleBnt>,
          <CircleBnt>6</CircleBnt>,
          <CircleBnt>7</CircleBnt>,
          <CircleBnt>8</CircleBnt>
        ]}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
