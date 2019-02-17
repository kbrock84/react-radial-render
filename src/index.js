import React, { useState } from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "react-error-boundary";
import "./styles.css";
import RadialRender from "../package-publish/RadialRender";

const ControlBtn = props => {
  return (
    <button
      onClick={props.onClick}
      style={{
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#333333",
        color: "#fefefe",
        margin: "4px",
        fontSize: "16px",
        padding: "8px"
      }}
    >
      {props.children}
    </button>
  );
};

const ControlBar = props => {
  return (
    <div
      style={{
        margin: "4px",
        padding: "4px",
        border: "2px solid #888888",
        borderRadius: "4px"
      }}
    >
      {props.children}
    </div>
  );
};

const CircleBnt = props => {
  return (
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
  );
};

function App() {
  const [radius, setRadius] = useState(50);
  const [btn1Text, setBtn1Text] = useState(1);
  const [childComponents, setChildComponents] = useState([
    <CircleBnt>{btn1Text}</CircleBnt>,
    <CircleBnt>2</CircleBnt>,
    <CircleBnt>3</CircleBnt>,
    <CircleBnt>4</CircleBnt>,
    <CircleBnt>5</CircleBnt>
  ]);
  const [childLength, setChildLength] = useState(childComponents.length);

  const addChild = () => {
    let c = childComponents;
    c.push(
      <CircleBnt key={childComponents.length - 1}>
        {childComponents.length + 1}
      </CircleBnt>
    );
    setChildComponents(c);
    setChildLength(childLength + 1);
  };

  const removeChild = () => {
    let c = childComponents;
    c.pop();
    setChildComponents(c);
    setChildLength(childLength - 1);
  };

  const updateBtn1Text = () => {
    let components = childComponents;
    components[0] = <CircleBnt>{btn1Text + 1}</CircleBnt>;
    setChildComponents(components);
    setBtn1Text(btn1Text + 1);
  };

  return (
    <div className="App">
      <ControlBar>
        <ControlBtn onClick={() => updateBtn1Text()}>btn1+</ControlBtn>
        <ControlBtn onClick={() => setRadius(radius - 10)}>r-</ControlBtn>
        <ControlBtn onClick={() => setRadius(radius + 10)}>r+</ControlBtn>
        <ControlBtn onClick={addChild}>components +</ControlBtn>
        <ControlBtn onClick={removeChild}>components -</ControlBtn>
      </ControlBar>
      <ErrorBoundary>
        {console.log(childComponents.length)}
        <RadialRender r={radius}>
          {childComponents.map((c, i) => (
            <div key={i}>{c}</div>
          ))}
        </RadialRender>
      </ErrorBoundary>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
