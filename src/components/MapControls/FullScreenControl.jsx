import { useContext, useEffect } from "react"
import { FullScreen, MousePosition } from "ol/control"
import {createStringXY} from 'ol/coordinate'
import MapContext from "../../context/map.context"

const FullScreenControl = () => {
    const { map } = useContext(MapContext)

    useEffect(() => {
        if (!map) return

        let fullScreenControl = new FullScreen({})
        let mousePositionControl = new MousePosition({
            coordinateFormat: createStringXY(4),
            projection: 'EPSG:4326'
        })

        map.controls.push(fullScreenControl)
        map.controls.push(mousePositionControl)

        return () => {
            map.controls.remove(fullScreenControl)
            map.controls.remove(mousePositionControl)
        }
    }, [map])

    return null
}

export default FullScreenControl