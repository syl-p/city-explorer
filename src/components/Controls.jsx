import { MapControls } from '@react-three/drei'
import { useContext, useEffect, useRef } from 'react'
import { DataContext } from '../DataContext'

const Controls = () => {
  const {state, setTargetPosition} = useContext(DataContext)
  const timer = useRef(null)
  useEffect(() => {
    console.log("test")
  }, [state])
    

  return (
    <MapControls
      onEnd={({target}) => {
        console.log(target)
        setTargetPosition({...target.target})
      }}
      enableRotate={false}
      enableZoom={false}
      makeDefault/>
  )
}

export default Controls