import * as GeoTIFF from "geotiff";
import { useContext, useEffect, useRef, useState } from "react";
import GpsRelativePosition from "../utils/GpsRelativePosition";
import { OrthographicCamera, PerspectiveCamera, RenderTexture } from "@react-three/drei";
import { PlaneGeometry } from "three";
import * as THREE from "three"
import { DataContext } from "../DataContext";

export default function Terrain({children}) {
    const terrainRef = useRef(null)
    const {state, setTerrainRef} = useContext(DataContext)

    useEffect(() => {
        setTerrainRef(terrainRef)
    }, [])

    function TerrainGeo({x, y, data, children}) {
        const geometry = new PlaneGeometry(x, y, x-1 , y-1)
        useEffect(() => {
            for (let i = 0; i < data.length; i++) {
                const el = data[i];
                geometry.getAttribute('position').setZ(i, - (el/30))
                geometry.getAttribute('position').needsUpdate = true
            }
            geometry.computeBoundingBox()
        }, [])

        return <>
            <mesh ref={terrainRef} geometry={geometry} receiveShadow castShadow rotation-x={Math.PI/2} rotation-z={-Math.PI /2}>
                <meshStandardMaterial side={THREE.DoubleSide}>
                    <RenderTexture 
                        depthBuffer
                        attach="map">
                        <PerspectiveCamera makeDefault manual aspect={x / y} position={[0, 0, y + 16]}/>
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[10, 10, 5]} castShadow/>
                        <color attach="background" args={['#858585']} />
                        {children}
                    </RenderTexture>
                </meshStandardMaterial>
            </mesh>
        </>
    }

    return <>
        {state.terrain && <TerrainGeo x={state.terrain.x} y={state.terrain.y} data={state.terrain.data}>{children}</TerrainGeo> }
    </>
}
