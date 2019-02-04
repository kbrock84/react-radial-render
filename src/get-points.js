export function getPoints(r, num, cx = null, cy = null) {
  let points = [];

  for (let i = 1; i < num + 1; i++) {
    let cx = cx || r;
    let cy = cy || r;
    points.push({
      x: cx + Math.round(r * Math.sin((Math.PI / (num / 2)) * i)),
      y: cy + Math.round(r * Math.cos((Math.PI / (num / 2)) * i))
    });
  }

  return points;
}

export function getSvgPoints(r, num, cx = null, cy = null) {
  let points = getPoints(r, num, (cx = null), (cy = null));
  let pointsStr = "";
  points.forEach(val => {
    pointsStr += `${val.x},${val.y} `;
  });
}
