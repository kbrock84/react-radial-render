import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function RChild(props) {
  const ref = useRef();
  props.addRef(ref);
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: `${props.point.y}px`,
        left: `${props.point.x}px`
      }}
    >
      {props.children}
    </div>
  );
}

function RadialRender(props) {
  const containerRef = useRef();

  const RChildrenRefs = [];
  let renderPoints = getPoints(props.r, props.components.length);
  const addRef = ref => RChildrenRefs.push(ref);

  useEffect(() => {
    let leftBounds = 0;
    let rightBounds = 0;
    let topBounds = 0;
    let bottomBounds = 0;

    RChildrenRefs.forEach(ref => {
      let el = ref.current;

      let left, top;

      [left, top] = [
        parseInt(el.style.left.replace("px", "")),
        parseInt(el.style.top.replace("px", ""))
      ];

      let right = left + el.offsetWidth;
      let bottom = top + el.offsetHeight;

      leftBounds = left < leftBounds ? left : leftBounds;
      rightBounds = right > rightBounds ? right : rightBounds;
      topBounds = top < topBounds ? top : topBounds;
      bottomBounds = bottom > bottomBounds ? bottom : bottomBounds;
    });

    let width = -1 * leftBounds + rightBounds + "px";
    let height = -1 * topBounds + bottomBounds + "px";

    let container = containerRef.current;
    container.style.width = width;
    container.style.height = height;
  });

  return (
    <div
      ref={containerRef}
      className="radial-render-container"
      style={{ margin: "0", padding: "0", position: "relative" }}
    >
      {renderPoints.map((point, i) => (
        <RChild
          addRef={addRef}
          key={props.genKey ? props.genKey() : `radial-render-${i}`}
          point={point}
        >
          {props.components[i]}
        </RChild>
      ))}
    </div>
  );
}

RadialRender.propTypes = {
  r: PropTypes.number.isRequired,
  components: PropTypes.array.isRequired,
  genKey: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number
};

export default RadialRender;
