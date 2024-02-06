export default function Layout({children}) {
    return <>
        <div className="h-full w-full absolute top-0 left-0">{children}</div>
        <main className="flex flex-col justify-between">
            <header className="w-full z-50 text-white flex space-x-12 p-6">
                <div className="block flex-1 flex space-x-4 items-center">
                    <img src="./svg-logo.svg" className="w-14 h-14 bg-yellow-600"/>
                    <a>
                        <span className="block text-xl">Mountain explorer</span>
                        <span className="block text-sm">Le relief Audois en 3D</span>
                    </a>
                </div>
                <div>
                    ui...
                </div>
            </header>
            <Filters filters={[
                {name: "Sommets", data: data.picks.features},
                {name: "Routes", data: data.roads.features},
                {name: "Points d'eau", data: data.waters.features}
            ]} />
            <footer className="p-6 z-50 text-white">
                <p>Développer par Websylvain</p>
            </footer>
        </main>
    </>
}