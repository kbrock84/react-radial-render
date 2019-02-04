# \<RadialRender />

## Render React components in a circle

### Install

``` bash
npm i react-radial-render
```

### Usage

Pass an array of components to render.
``` jsx
     <RadialRender
        sides={5}
        r={70}
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
```

Components will render counter clockwize starting from the bottom right

#### Result:

![](demo/radial-render.PNG)
