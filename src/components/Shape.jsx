import { useLayoutEffect, useMemo } from "react";
import * as THREE from 'three'
import GpsRelativePosition from "../utils/GpsRelativePosition";
import { useRef } from "react";
const CENTER = [2.3496561, 43.2125702]
const options = {
    curveSegments: 1,
    depth: 0,
    bevelEnabled: false
  }

export default function Shape({coordinates, color}) {
    const geometry = useRef()
    
    useLayoutEffect(() => {
        geometry.current.computeBoundingBox()
        geometry.current.rotateX(Math.PI/2)
        geometry.current.rotateZ(Math.PI)
        geometry.current.rotateY(- Math.PI/2)
    }, [coordinates, color])

    function genShape(points, center) {
        let shape = new THREE.Shape()
        for (let i = 0; i < points.length; i++) {
          const point = points[i];
          const pointNormalized = GpsRelativePosition(point, center)
    
          if(i === 0) {
            shape.moveTo(pointNormalized[0], pointNormalized[1])
          } else {
            shape.lineTo(pointNormalized[0], pointNormalized[1])
          }
        }
    
        return shape
    }

    const shape = useMemo(() => {
        let shape = null
        const holes = []
        for (let i = 0; i < coordinates.length; i++) {
            const shapeIte = genShape(coordinates[i], CENTER);
            if(i === 0) {
                shape = shapeIte
            } else {
                holes.push(shapeIte)
            }
        }
        return shape
    }, [coordinates])

    return <>
        <mesh>
            <extrudeGeometry ref={geometry} args={[shape, options]} />
            <meshPhongMaterial color={color}></meshPhongMaterial>
        </mesh>
    </>
}