# \<RadialRender />

### Render React components in a circle
<br />

## Requirements
**React 16.8.1**
<br />
<br />

## Version Notes

This component has been simplified in version 2.0.0-alpha. The only required prop is **<code>r</code>** and the components are passed as children.
<br />
<br />
## Install

```bash
npm i react-radial-render
```
<br />

## Usage

Import the **<code>RadialRender</code>** component:

``` javascript
import RadialRender from "react-radial-render";
```

Wrap the components you would like to render in a circle with the **<code>RadialRender</code>** component.
Pass prop **<code>r</code>** as the radius

```jsx
<RadialRender r={70}>
  <CircleBnt>1</CircleBnt>
  <CircleBnt>2</CircleBnt>
  <CircleBnt>3</CircleBnt>
  <CircleBnt>4</CircleBnt>
  <CircleBnt>5</CircleBnt>
  <CircleBnt>6</CircleBnt>
  <CircleBnt>7</CircleBnt>
  <CircleBnt>8</CircleBnt>
</RadialRender>
```

Components will render clockwise starting from the top right

### Result:

The components will be rendered along the radius at the center point of each component.

![](demo/radial-render.PNG)

<br />

## Props

### r

```javascript
r: PropTypes.number.isRequired
```

The radius to render all components in a circle. Components will be rendered at their centerpoint along the radius.
