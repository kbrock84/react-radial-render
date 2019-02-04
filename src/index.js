import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import RadialRender from "./RadialRender";

const Btn = props => {
  return (
    <div>
      <button style={{ height: "30px", width: "30px", borderRadius: "15px" }}>
        {props.children}
      </button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <RadialRender
        sides={5}
        r={70}
        strokeWidth={2}
        components={[
          <Btn>1</Btn>,
          <Btn>2</Btn>,
          <Btn>3</Btn>,
          <Btn>4</Btn>,
          <Btn>5</Btn>,
          <Btn>6</Btn>,
          <Btn>7</Btn>,
          <Btn>8</Btn>
        ]}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
