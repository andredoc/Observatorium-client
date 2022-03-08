import XYZ from "ol/source/XYZ"
import WMTSTileGrid from "ol/tilegrid/WMTS"
import {Icon, Style} from "ol/style"
import eventMarker24 from "./assets/images/event-marker-64-47-24.png"
import Feature from "ol/Feature"
import Point from "ol/geom/Point"

const defaultTileGridOptions = {
    origin: [-180, 90],
    resolutions: [
        0.5625,
        0.28125,
        0.140625,
        0.0703125,
        0.03515625,
        0.017578125,
        0.0087890625,
        0.00439453125,
        0.002197265625
    ],
    matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    tileSize: 512
}

export const formattedCurrentDate = () => new Date().toLocaleDateString().split('/').reverse().join('-')

export const baseLayerConfig = new XYZ({
    /*url : 'https://maps.ecere.com/ogcapi/collections/blueMarble/map/tiles/WorldCRS84Quad'*/ //in case api.maptiler doesnt works
    url : `https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${process.env.REACT_APP_MAPTILER_API_KEY}`,
    tileSize: 512
})
export const wmtsTileGrid = new WMTSTileGrid(defaultTileGridOptions)

export const presipitationRateLayer = {
    id: 'IMERG_Precipitation_Rate',
    config: {
        url: `https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2022-03-01T00:00:00Z`,
        layer: 'IMERG_Precipitation_Rate',
        format: 'image/png',
        matrixSet: '2km',
        tileGrid: wmtsTileGrid
    },
    showLayer: false
}

export const createMapMarkers = (events) => {
    const iconStyle = new Style({
        image: new Icon({
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: eventMarker24
        })
    })

    const markers = events.map(earthEvt => {
        const {geometry} = earthEvt
        let feature = new Feature({
            geometry: new Point(geometry[geometry.length-1].coordinates)
        })
        feature.setStyle(iconStyle)
        return feature
    })

    return markers
}
