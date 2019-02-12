import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function RadialRender(props) {
  const containerRef = useRef();
  const renderedComponents = props.components.map(c => useRef(c));
  let renderPoints = getPoints(props.r, props.components.length);

  const updateComponents = () => {
    let leftBounds = 0;
    let rightBounds = 0;
    let topBounds = 0;
    let bottomBounds = 0;

    renderedComponents.forEach(ref => {
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

    let width = leftBounds + rightBounds + "px";
    let height = topBounds + bottomBounds + "px";

    let container = containerRef.current;
    container.style.width = width;
    container.style.height = height;
    console.log(`width:${width}, height:${height}`);
  };

  useEffect(() => {
    updateComponents();
  });

  return (
    <div ref={containerRef} className="radial-render-container">
      <div
        style={{
          position: "relative"
        }}
      >
        {renderPoints.map((point, i) => (
          <div
            key={props.genKey ? props.genKey() : `radial-render-${i}`}
            ref={renderedComponents[i]}
            style={{
              position: "absolute",
              top: `${point.y}px`,
              left: `${point.x}px`
            }}
          >
            {props.components[i]}
          </div>
        ))}
      </div>
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
