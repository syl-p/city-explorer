/* eslint-disable react/jsx-no-undef */
import {Canvas} from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Loader from "./components/Loader.jsx"
import {Suspense } from 'react'
import { Perf } from "r3f-perf";
import { DataContextProvider } from "./DataContext.jsx";

function App() {
  return <>
    <Suspense fallback={<Loader />}>
      <DataContextProvider>
        <div className="h-full w-full absolute top-0 left-0">
          <Canvas
            gl={{ logarithmicDepthBuffer: true, antialias: false }} dpr={[1, 1.5]}
            camera={
              {
                  fov: 70,
                  near: 0.1,
                  far: 300,
                  position: [0, 13, 0]
              }
            }
            shadows
          >
            <color attach="background" args={["#F1EDE8"]} />
            <Experience />
            <Perf />
          </Canvas>
        </div>
        {/* <main className="h-full flex flex-col justify-stretch items-start">
          <aside className="z-50 flex-1 flex flex-col justify-around">
            <Filters />
          </aside>
          <footer className="p-6 z-50 ">
              <p>Développer par Websylvain</p>
          </footer>
        </main> */}
      </DataContextProvider>
    </Suspense>
  </>
}

export default App
