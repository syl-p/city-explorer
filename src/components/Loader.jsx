import { useProgress } from "@react-three/drei"

export default function Loader() {
  const { progress } = useProgress()
  return <div className="z-100 h-screen w-screen fixed top-0 left-0 flex flex-col justify-center items-center">
    <p className="text-4xl">{progress} % loaded</p>
  </div>
}