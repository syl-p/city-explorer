import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Rig() {
    const scroll = useScroll()
    useFrame((state, delta) => {
        const offset = 1 - scroll.offset
        // console.log(offset,  state.controls)
        // state.camera.position.set(Math.sin(offset) * 10, Math.atan(offset * Math.PI * 2) * 5, Math.cos((offset * Math.PI) / 3) * -10)
        state.camera.position.set(state.camera.position.x, Math.atan(offset * Math.PI * 2) * 10, state.controls.target.z + (Math.cos((offset * Math.PI) / 3) * 10))
        // state.camera.lookAt(state.controls.target)
    })
}