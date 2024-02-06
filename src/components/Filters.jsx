import {useCallback, useContext, useMemo} from "react"
import { DataContext } from "../DataContext"

export default function Filters({clickCallback}) {
    const {state, setActive} = useContext(DataContext)

    function cssGroupClass(list) {
        const defaultListClass = "max-h-0 group-hover:max-h-[300px] overflow-hidden overflow-y-visible transition-all duration-300"
        let classListActive = ""

        const defaultTitleClass = "group-hover:text-4xl cursor-pointer"
        let classTitleActive = ""

        if (state.active && state.active.type == list) {
            classListActive = "max-h-[300px]"
            classTitleActive = "text-4xl"
        }

        return {
            list: defaultListClass + " " + classListActive,
            title: defaultTitleClass + " " + classTitleActive
        }
    }

    return <>
        <div className="flex flex-col justify-center">
            <ul className="px-6">
                {
                    Object.keys(state.data).map(filter => (
                        <li className="group py-3 capitalize" key={state.data[filter].name}>
                            <a className={cssGroupClass(state.data[filter].type).title}>
                                {state.data[filter].name} ({state.data[filter].features.length})
                            </a>
                            <ul className={cssGroupClass(state.data[filter].type).list}>
                                {
                                    state.data[filter].features.filter(data => data.properties.name).map((data,index) => (
                                        <li className="py-1 cursor-pointer" key={index} onClick={() => setActive({name: data.properties.name, type: filter})}>
                                            {data.properties.name ?? ""}
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </div>
    </>
}
