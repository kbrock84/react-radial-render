export function getPoints(r, num, cx = null, cy = null) {
  let points = [];
  let centerX = cx || r;
  let centerY = cy || r;
  console.log(centerX);
  console.log(centerY);

  for (let i = 1; i < num + 1; i++) {
    points.push({
      x: centerX + Math.round(r * Math.sin((Math.PI / (num / 2)) * -i)),
      y: centerY + Math.round(r * Math.cos((Math.PI / (num / 2)) * -i))
    });
  }

  let retPoints = [];

  retPoints = points.slice(Math.floor(points.length / 2));
  retPoints = retPoints.concat(
    points.slice(null, Math.floor(points.length / 2))
  );
  return retPoints;
}

export function getSvgPoints(r, num, cx = null, cy = null) {
  let points = getPoints(r, num, (cx = null), (cy = null));
  let pointsStr = "";
  points.forEach(val => {
    pointsStr += `${val.x},${val.y} `;
  });
  return pointsStr;
}
