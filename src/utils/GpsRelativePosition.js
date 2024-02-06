import * as GEOLIB from "geolib";

export default function (objPosi, centerPosi) {
  // Get GPS distance
  let dis = GEOLIB.getDistance(objPosi, centerPosi)

  // Get bearing angle
  let bearing = GEOLIB.getRhumbLineBearing(objPosi, centerPosi)

  // Calculate X by centerPosi.x + distance * cos(rad)
  // @ts-ignore
  let x = centerPosi[0] + (dis * Math.cos(bearing * Math.PI / 180))

  // Calculate Y by centerPosi.y + distance * sin(rad)
  // @ts-ignore
  let y = centerPosi[1] + (dis * Math.sin(bearing * Math.PI / 180))

  // Reverse X (it work)
  return [-x / 100, y / 100]
}
