import { useContext, useEffect } from "react"
import MapContext from "../../context/map.context"
import TileLayer from "ol/layer/Tile"

const MapTileLayer = ({ source, zIndex = 0, extent = [-180, -90, 180, 90]}) => {
    const { map } = useContext(MapContext)

    useEffect(() => {
        if (!map) return

        let tileLayer = new TileLayer({
            source,
            /*zIndex,*/
            extent
        })

        map.addLayer(tileLayer)
        tileLayer.setZIndex(zIndex)

        return () => {
            if (map) {
                map.removeLayer(tileLayer)
            }
        }
    }, [map])

    return null
}

export default MapTileLayer
