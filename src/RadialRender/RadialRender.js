import React, { Component } from "react";
import PropTypes from "prop-types";
import { getPoints } from "./get-points";
import { red } from "ansi-colors";

class RadialRender extends Component {
  constructor(props) {
    super(props);
    this.renderedComponents = props.components.map(c => React.createRef());
    this.cx;
    this.cy;
    this.width;
    this.height;
    this.state = { renderTrigger: 0 };
  }

  componentDidMount() {
    let leftBounds = 0;
    let rightBounds = 0;
    let topBounds = 0;
    let bottomBounds = 0;

    this.renderedComponents.forEach(ref => {
      let el = ref.current;

      let left, top;
      [left, top] = this.centerElement(el);

      let right = left + el.offsetWidth;
      let bottom = top + el.offsetHeight;

      leftBounds = left < leftBounds ? left : leftBounds;
      rightBounds = right > rightBounds ? right : rightBounds;
      topBounds = top < topBounds ? top : topBounds;
      bottomBounds = bottom > bottomBounds ? bottom : bottomBounds;
    });

    this.width = -1 * leftBounds + rightBounds + "px";
    this.height = -1 * topBounds + bottomBounds + "px";
    this.triggerRender();
  }

  triggerRender() {
    this.setState({ renderTrigger: this.state.renderTrigger++ });
  }

  centerElement(el) {
    let left = parseInt(el.style.left.replace("px", "")) - el.offsetWidth / 2;
    el.style.left = left + "px";

    let top = parseInt(el.style.top.replace("px", "")) - el.offsetHeight / 2;
    el.style.top = top + "px";
    return [left, top];
  }

  render() {
    const points = getPoints(this.props.r, this.props.components.length);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-center",
          alignItems: "middle",
          backgroundColor: "orange",
          width: this.width || "",
          height: this.height || ""
        }}
      >
        <div
          style={{
            width: this.props.r * 2,
            height: this.props.r * 2,
            backgroundColor: "red",
            margin: "auto"
          }}
        >
          <div
            style={{
              position: "relative"
            }}
          >
            {points.map((point, i) => (
              <div
                key={
                  this.props.genKey ? this.props.genKey() : `radial-render-${i}`
                }
                ref={this.renderedComponents[i]}
                style={{
                  position: "absolute",
                  top: `${point.y}px`,
                  left: `${point.x}px`
                }}
              >
                {this.props.components[i]}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

RadialRender.propTypes = {
  r: PropTypes.number.isRequired,
  components: PropTypes.array.isRequired,
  genKey: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number
};

export default RadialRender;
