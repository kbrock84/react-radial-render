import React, { useState } from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "react-error-boundary";
import "./styles.css";
import RadialRender from "../package-publish/RadialRender";

const CircleBnt = props => {
  return (
    <button
      style={{
        height: "20px",
        width: "20px",
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
  return (
    <div
      className="App"
      style={{ position: "absolute", left: "50px", top: "50px" }}
    >
      <button onClick={() => setRadius(radius - 10)}>-</button>
      <button onClick={() => setRadius(radius + 10)}>+</button>
      <ErrorBoundary>
        <RadialRender
          r={radius}
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
      </ErrorBoundary>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
