import React, { Component } from "react";
import PropTypes from "prop-types";

class RadialRender extends Component {
  constructor(props) {
    super(props);
    this.myRefs = props.components.map(c => React.createRef());
  }

  componentDidMount() {
    this.myRefs.forEach(el => {
      let left =
        parseInt(el.current.style.left.replace("px", "")) -
        el.current.offsetWidth / 2 +
        "px";
      el.current.style.left = left;

      let top =
        parseInt(el.current.style.top.replace("px", "")) -
        el.current.offsetHeight / 2 +
        "px";
      el.current.style.top = top;
      console.log(top);
    });
  }

  render() {
    const points = getPoints(
      this.props.r,
      this.props.components.length,
      this.props.cx,
      this.props.cy
    );
    console.log(points);

    return (
      <div
        syle={{
          display: "flex",
          justifyContent: "flex-center",
          alignItems: "middle"
        }}
      >
        <div
          style={{
            width: this.props.width || `${this.props.r * 2}px`,
            height: this.props.height || `${this.props.r * 2}px`,
            position: "relative"
          }}
        >
          {points.map((point, i) => (
            <div
              key={
                this.props.genKey ? this.props.genKey() : `radial-render-${i}`
              }
              ref={this.myRefs[i]}
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
    );
  }
}

RadialRender.propTypes = {
  r: PropTypes.number.isRequired,
  components: PropTypes.array.isRequired,
  genKey: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  cx: PropTypes.number,
  cy: PropTypes.number
};

export default RadialRender;