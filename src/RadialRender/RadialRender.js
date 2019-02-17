import React, { useLayoutEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

function RChild(props) {
  const ref = useRef();
  props.addRef(ref);
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: `${props.top}px`,
        left: `${props.left}px`
      }}
    >
      {props.children}
    </div>
  );
}

function RadialRender(props) {
  const containerRef = useRef();
  const childArray = React.Children.toArray(props.children);

  const RChildrenRefs = [];
  const { points, leastX, leastY, greatestX, greatestY } = getPoints(
    props.r,
    childArray.length
  );
  const addRef = ref => RChildrenRefs.push(ref);

  useLayoutEffect(() => {
    let rightBounds = 0;
    let bottomBounds = 0;

    RChildrenRefs.forEach(ref => {
      let el = ref.current;

      const [left, top] = [
        parseInt(el.style.left.replace("px", "")),
        parseInt(el.style.top.replace("px", ""))
      ];

      if (left == greatestX - leastX) {
        rightBounds = left + el.offsetWidth + leastX;
      }

      if (top == greatestY - leastY) {
        bottomBounds = top + el.offsetHeight + leastY;
      }
    });

    let container = containerRef.current;
    container.style.width = rightBounds - leastX + "px";
    container.style.height = bottomBounds - leastY + "px";
  });

  return (
    <div
      ref={containerRef}
      className="radial-render-container"
      style={{ margin: "0", padding: "0", position: "relative" }}
    >
      {points.map((point, i) => (
        <RChild
          addRef={addRef}
          key={props.genKey ? props.genKey() : `radial-render-${i}`}
          top={point.y - leastY}
          left={point.x - leastX}
        >
          {childArray[i]}
        </RChild>
      ))}
    </div>
  );
}

RadialRender.propTypes = {
  r: PropTypes.number.isRequired
};

export default RadialRender;
