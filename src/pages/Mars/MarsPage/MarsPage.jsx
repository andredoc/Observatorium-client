import { Outlet } from 'react-router-dom'
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import Mars3D from "../../../components/Mars3D/Mars3D"
import MarsIntro from "../../../components/MarsIntro/MarsIntro"
import "./MarsPage.css"


function MarsPage() {

    return (
        <>
            <div className="stars">
                <div className="twinkling">
                    <div className="mars-canvas-container">
                        <MarsIntro />
                        <Canvas style={{ height: 250 }}>
                            <Suspense fallback={null}>
                                <Mars3D />
                            </Suspense>
                        </Canvas>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MarsPage