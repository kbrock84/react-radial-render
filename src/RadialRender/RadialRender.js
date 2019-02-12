import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

function RadialRender(props) {
  const [containerDims, setContainerDims] = useState({ width: 0, height: 0 });
  const [renderPoints] = useState(getPoints(props.r, props.components.length));

  const [isCentered, setIsCentered] = useState(false);
  const renderedComponents = props.components.map(c => useRef(c));

  useEffect(() => {
    let leftBounds = 0;
    let rightBounds = 0;
    let topBounds = 0;
    let bottomBounds = 0;

    renderedComponents.forEach(ref => {
      let el = ref.current;

      let left, top;
      if (!isCentered) {
        [left, top] = centerElement(el);
      } else {
        [left, top] = [el.style.left, el.style.top];
      }

      let right = left + el.offsetWidth;
      let bottom = top + el.offsetHeight;

      leftBounds = left < leftBounds ? left : leftBounds;
      rightBounds = right > rightBounds ? right : rightBounds;
      topBounds = top < topBounds ? top : topBounds;
      bottomBounds = bottom > bottomBounds ? bottom : bottomBounds;
    });

    let width = -1 * leftBounds + rightBounds + "px";
    let height = -1 * topBounds + bottomBounds + "px";
    if (containerDims.width == 0) {
      setContainerDims({ width: width, height: height });
    }
    setIsCentered(true);
  });

  return (
    <div
      data-testid={isCentered ? "render-complete" : "render-incomplete"}
      style={{
        display: "flex",
        justifyContent: "flex-center",
        alignItems: "middle",
        width: containerDims.width || "",
        height: containerDims.height || ""
      }}
    >
      <div
        style={{
          width: props.r * 2,
          height: props.r * 2,
          margin: "auto"
        }}
      >
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
    </div>
  );
}

function centerElement(el) {
  let left = parseInt(el.style.left.replace("px", "")) - el.offsetWidth / 2;
  el.style.left = left + "px";

  let top = parseInt(el.style.top.replace("px", "")) - el.offsetHeight / 2;
  el.style.top = top + "px";
  return [left, top];
}

RadialRender.propTypes = {
  r: PropTypes.number.isRequired,
  components: PropTypes.array.isRequired,
  genKey: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number
};

export default RadialRender;
