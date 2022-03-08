import { useContext, useEffect } from "react"
import MapContext from "../../context/map.context"
import OLVectorLayer from "ol/layer/Vector"

const VectorLayer = ({ source, style, zIndex = 10 }) => {
    const { map } = useContext(MapContext)

    useEffect(() => {
        if (!map) return

        let vectorLayer = new OLVectorLayer({
            source,
            style
        })

        map.addLayer(vectorLayer)
        vectorLayer.setZIndex(zIndex)

        return () => {
            if (map) {
                map.removeLayer(vectorLayer)
            }
        }
    }, [source])

    return null
}

export default VectorLayer
