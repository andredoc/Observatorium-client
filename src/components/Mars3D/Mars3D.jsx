import { useRef } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import * as THREE from "three"
import './Mars3D.css'

import MarsMap from "../../assets/images/8k_mars.jpg"
import { TextureLoader } from "three"

function Mars3D() {
    const [colorMap, normalMap, specularMap] = useLoader(
        TextureLoader,
        [MarsMap]
    )

    const marsRef = useRef()

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime()

        marsRef.current.rotation.y = elapsedTime / 6
    })

    return (
        <>
            {/* <ambientLight intensity={1} />  */}
            <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />
            <Stars
                radius={300}
                depth={60}
                count={20000}
                factor={7}
                saturation={0}
                fade={true}
            />
            <mesh ref={marsRef} position={[0, 0, 3]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshPhongMaterial specularMap={specularMap} />
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    metalness={0.4}
                    roughness={0.7}
                />
                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    zoomSpeed={0.6}
                    panSpeed={0.5}
                    rotateSpeed={0.4}
                />
            </mesh>
        </>
    )
}

export default Mars3D