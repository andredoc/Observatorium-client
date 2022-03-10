import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber"
import Earth from "../../components/Earth/Earth"
import IntroductionSection from "../../components/IntroductionSection/IntroductionSection"
import "./Earth3d.css"

function Earth3dPage() {

    return (
        <>
            <div className="canvas-container">
                <IntroductionSection />
                <Canvas>
                    <Suspense fallback={null}>
                        <Earth />
                    </Suspense>
                </Canvas>
            </div>
        </>
    )
}

export default Earth3dPage