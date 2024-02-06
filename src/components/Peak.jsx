import { Html } from "@react-three/drei";
import GpsRelativePosition from "../utils/GpsRelativePosition";
import * as THREE from 'three'
import { useContext, useMemo } from "react";
import { DataContext } from "../DataContext";
const CENTER = [43.2125702,2.3496561]

export default function Peak({coordinates, properties, clickCallback}) {
    const {state, setActive} = useContext(DataContext)
    const pointNormalized = GpsRelativePosition(coordinates, CENTER)
    const position = new THREE.Vector3(pointNormalized[0], properties['ele'] ? -properties['ele'] / 30 : 0, pointNormalized[1])
        // position.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2); // Rotation autour de l'axe X
        position.applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI); // Rotation autour de l'axe Z
        position.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2); // Rotation autour de l'axe Y

    function cssClasses() {
        const defaultClass = "opacity-0 group-hover:opacity-100 group-hover:z-50 transition-all duration-500 group-hover:w-auto border border-stone-700 px-2 py-1 bg-stone-800/80 absolute -top-1/2 left-10 min-w-[150px]"
        let classActive = ""
        if (state.active && state.active.name == properties.name) {
            classActive = "opacity-100 z-50 w-auto"
        }
        return defaultClass + " " + classActive
    }
    
    const icon = <>
        <svg fill="#ffffff" width="20px" height="20px" viewBox="0 0 100 100" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" stroke="#ffffff">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
            <g id="SVGRepo_iconCarrier"> <g id="_x31_"/> <g id="_x32_"/> <g id="_x33_"/> <g id="_x34_"/> <g id="_x35_"/> <g id="_x36_"/> <g id="_x37_"> <path d="M91.3,75.5h-3.4L58.2,24c-0.9-1.6-2.6-2.6-4.4-2.6s-3.5,1-4.4,2.6l-7,12.2c-1-1.1-2.3-1.7-3.8-1.7c-1.9,0-3.5,1-4.4,2.6 l-8.7,15c0,0,0,0,0,0L11.8,75.5H8.8c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5h82.5c0.8,0,1.5-0.7,1.5-1.5S92.1,75.5,91.3,75.5z M44.7,38l7.2-12.5c0.4-0.7,1.1-1.1,1.8-1.1s1.5,0.4,1.8,1.1l28.9,50H65.1L44.7,40.2C44.3,39.5,44.3,38.7,44.7,38z M36.6,38.6 c0.4-0.7,1.1-1.1,1.8-1.1c0.8,0,1.5,0.4,1.8,1.1l6.1,10.6c-2.6-0.6-5.7-0.2-8.7,2.5c-3.5,3.2-7.3,1.7-9,0.7L36.6,38.6z M27.2,55 c1.5,0.9,3.6,1.7,5.8,1.7c2.2,0,4.5-0.7,6.7-2.7c4.3-3.9,8.4-0.9,9.3-0.1l11.8,20.5l0.7,1.2H15.3L27.2,55z M66.3,62.3 c-0.5,0-1-0.3-1.3-0.8l-7.9-14.3c-0.4-0.7-0.1-1.6,0.6-2c0.7-0.4,1.6-0.1,2,0.6L67.6,60c0.4,0.7,0.1,1.6-0.6,2 C66.8,62.2,66.5,62.3,66.3,62.3z"/> </g> <g id="_x38__x27_"/> <g id="_x39_"/> <g id="_x31_0"/> <g id="_x31_1"/> <g id="_x31_2"/> <g id="_x31_3"/> <g id="_x31_4"/> <g id="_x31_5"/> <g id="_x31_6"/> <g id="_x31_7"/> <g id="_x31_8"/> <g id="_x31_9"/> <g id="_x32_0"/> <g id="_x32_1"/> <g id="_x32_2"/> <g id="_x32_3"/> <g id="_x32_4"/> <g id="_x32_5"/> </g>
        </svg>
    </>

    return <>
        <Html position={[position.x, position.y, position.z]} center>
            <div onClick={() => clickCallback(position, properties.name, "peaks")} className="group absolute cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-Y-1/2 text-white">
                <i className="absolute -top-1/2 -left-1/2 bg-yellow-500/70 h-8 w-8 flex flex-col justify-center items-center">
                    {icon}
                </i>
                <div className={cssClasses()}>
                    <p className="text-yellow-600 font-bold">{properties.ele ?? '--'} M</p>
                    <p className="uppercase text-xs">{properties.name}</p>
                </div>
            </div>
        </Html>
    </>
}
