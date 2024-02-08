import { useMemo } from "react";
import * as THREE from 'three'
import GpsRelativePosition from "../utils/GpsRelativePosition";
const CENTER = [2.3496561, 43.2125702]
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

function shape(coordinates, height = 1, target) {
    if(!coordinates[0][1]) return;
    const options = {
        curveSegments: 1,
        depth: 0.05 * height,
        bevelEnabled: false
    }

    function genShape(points, center) {
        let shape = new THREE.Shape()
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            const pointNormalized = GpsRelativePosition(point, center)

            const distance = target.distanceTo(new THREE.Vector3(
                pointNormalized[0], 
                pointNormalized[1], 
                pointNormalized[2])
            )
            
            if(distance >= 10) {
                break;
            }

            if(i === 0) {
                shape.moveTo(pointNormalized[0], pointNormalized[1])
            } else {
                shape.lineTo(pointNormalized[0], pointNormalized[1])
            }
        }

        return shape
    }

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

    const extrude = new THREE.ExtrudeGeometry(shape, options)
    extrude.computeBoundingBox()

    return extrude
}

export default function Urban({features, target}) {
    const merged = useMemo(() => {
        let geometryArray = []
        features.filter(v => v.geometry && v.geometry.type === "Polygon").map(feature => (
            geometryArray.push(shape(feature.geometry.coordinates, feature.properties["building:levels"], target))
        ))
    
        return BufferGeometryUtils.mergeGeometries(geometryArray)
    }, [features, target])

    return <>
        <mesh castShadow receiveShadow geometry={merged} rotation-z={-Math.PI /2}>
            <meshStandardMaterial color="white" />
        </mesh>
    </>
}