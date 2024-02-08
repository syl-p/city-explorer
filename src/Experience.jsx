/* eslint-disable react/no-unknown-property */
import {useContext, useRef, useState} from "react";
import Road from './components/Road'
import { ContactShadows, MapControls, ScrollControls, Sky, Stage, useHelper } from "@react-three/drei";
import * as THREE from "three"
import { DataContext } from "./DataContext";
import Urban from "./components/Urban.jsx";
import Rig from "./components/Rig.jsx"

import Shape from "./components/Shape.jsx"

export default function Experience() {
    const dirLight = useRef()
    useHelper(dirLight, THREE.DirectionalLightHelper, 1)
    const groupRoad = useRef()
    const groupWater = useRef()
    const {state} = useContext(DataContext)
    const [target, setTarget] = useState(new THREE.Vector3())

    const landuseColor = {
        "grass": "#B2D3A8",
        "forest": "#B2D3A8",
        "residential": "#ECE9E4",
        "industrial": "#ECE9E4",
        "default": "#FEFEFF"
    }

    function getColor(properties) {
        if (properties.landuse) {
            if (landuseColor[properties.landuse]) {
                return landuseColor[properties.landuse]
            } else {
                return landuseColor.default
            }
        } else {
            return "#63A088"
        }
    }
    

    return <>
        <MapControls
            onEnd={(e) => {
                setTarget(
                    new THREE.Vector3(e.target.target.z, 
                        e.target.target.y, e.target.target.x)
                        .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
                        .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI)
                        
            )
            }}
            enableRotate={false}
            enableZoom={false}
            makeDefault />


        <ScrollControls pages={3}>
            <group ref={groupRoad}>
                {
                    state.data.roads.features.map((feature, index) => (
                        <Road key={index} coordinates={feature.geometry.coordinates}/>
                    ))
                }
            </group>

            <group ref={groupWater} position-y={-0.01}>
                {
                    state.data.waters.features.map((feature, index) => (
                        (feature.geometry.coordinates[0][1] && Array.isArray(feature.geometry.coordinates[0][1])) && 
                        <Shape color="#32CBFF" key={index} coordinates={feature.geometry.coordinates} />
                    ))
                }
            </group>

            <group position-y={-0.01}>
                {
                    state.data.greenSpaces.features.map((feature, index) => (
                        (feature.geometry.coordinates[0][1] && Array.isArray(feature.geometry.coordinates[0][1])) && 
                            <Shape color={getColor(feature.properties)} key={index} coordinates={feature.geometry.coordinates} />
                    ))
                }
            </group>

            {/* <group position-y={-0.02}>
                {
                    state.data.landuses.features.map((feature, index) => (
                        (feature.geometry.coordinates[0][1] && Array.isArray(feature.geometry.coordinates[0][1])) && 
                            <Shape color={getColor(feature.properties)} key={index} coordinates={feature.geometry.coordinates} />
                    ))
                }
            </group> */}

            <group rotation-x={Math.PI / 2} rotation-y={Math.PI}>
                <Urban features={state.data.buildings.features} target={target}/>
            </group>

            <ContactShadows opacity={1} scale={100} blur={0.05} far={0.4} resolution={2048} frames={1} color="#000000"/>
            <Sky />
            <Rig />
        </ScrollControls>
        <Stage shadows environment="city" castShadow receiveShadow intensity={1} />
    </>
}
