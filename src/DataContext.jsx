import { useLoader } from "@react-three/fiber";
import { createContext, useMemo, useState } from "react";
import { FileLoader } from "three";

import roadGjson from '/geo_jsons/road.geojson?url'
import waterGjson from '/geo_jsons/water.geojson?url'
import buildingGjson from '/geo_jsons/building.geojson?url'
import greenSpaceGjson from '/geo_jsons/green_space.geojson?url'
import landuseGjson from '/geo_jsons/landuse.geojson?url'
const CENTER = [2.5438099431228546, 43.15117793128316]

const DataContext = createContext({
    state: null,
    setActive: () => {},
    setTerrainRef: () => {}
})

// eslint-disable-next-line react/prop-types
function DataContextProvider({children}) {
    let [roads, waters, building, greenSpace, landuses] = useLoader(FileLoader, [roadGjson, waterGjson, buildingGjson, greenSpaceGjson, landuseGjson])
    const parsed_data = {
        roads: {...JSON.parse(roads), name: "Routes", type: "roads"},
        waters: {...JSON.parse(waters), name: "Waters", type: "waters"},
        buildings: {...JSON.parse(building), name: "buildings", type: "buildings"},
        greenSpaces: {...JSON.parse(greenSpace), name: "green_spaces", type: "green_spaces"},
        landuses: {...JSON.parse(landuses), name: "landuses", type: "landuses"}
    }

    const [state, setState] = useState({
        active: null,
        data: parsed_data,
    })
    
    const value = useMemo(() => {
        return {
            state
        }
    }, [state])

    return <>
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    </>
}

export {DataContext, DataContextProvider}
