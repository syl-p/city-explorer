import { useEffect, useMemo, useRef } from "react"
import * as THREE from 'three'
import GpsRelativePosition from '../utils/GpsRelativePosition'
const CENTER = [2.3496561, 43.2125702]

export default function Road({coordinates}) {
    if (!coordinates[0][0] || !coordinates[0][1]) return;
    if(coordinates.length < 2 ) return;

    const geometry = useRef()
    const points = useMemo(() => {
        const points = []
        for (let i = 0; i < coordinates.length; i++) {
            let el = coordinates[i]

            if(!el[0] || !el[1]) return;

            let elp = [el[0], el[1]]
            elp = GpsRelativePosition(elp, CENTER)
            points.push(
                new THREE.Vector3(elp[0], 0.01, elp[1])
            )
        }
        return points
    }, [coordinates])

    useEffect(() => {
        geometry.current.setFromPoints(points)
        geometry.current.computeBoundingBox()
        geometry.current.rotateX(Math.PI)
        // geometry.current.rotateZ(Math.PI)
        geometry.current.rotateY(Math.PI/2)
    }, [coordinates, points])

    return <>
        <line>
            <bufferGeometry ref={geometry}></bufferGeometry>
            <lineBasicMaterial color="#000000" linewidth={5}/>
        </line>
    </>
}