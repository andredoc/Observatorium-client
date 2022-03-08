import { useEffect, useState } from "react"
import { Container, Row, Col, Form } from 'react-bootstrap'

import { get } from "ol/proj"
import {
    baseLayerConfig,
    presipitationRateLayer,
    wmtsTileGrid,
    formattedCurrentDate,
    createMapMarkers
} from '../../mapHelpers'

import eonetService from "../../services/Nasa/eonet.service"

import Map from "../../components/Map/Map"
import { MapLayers, MapTileLayer, VectorLayer } from "../../components/MapLayers"
import { wmts, vector } from "../../source"
import { MapControls, FullScreenControl } from "../../components/MapControls"


function EarthPage() {

    const [events, setEvents] = useState([])
    const [layers, setLayers] = useState([presipitationRateLayer])
    const [eventsMarkers, setEventsMarkers] = useState([])
    const [selectedEvent, setSelectedEvent] = useState({})
    const [center, setCenter] = useState([0, 0])
    const [zoom, setZoom] = useState(1)
    const [mapProj, setMapProj] = useState(get("EPSG:4326"))

    useEffect(() => {
        eonetService
            .getEvents({
                status: 'open',
                limit: 20,
                start: formattedCurrentDate()
            })
            .then(({ data }) => {
                const { events } = data
                setEvents(events)
            })
    }, [])

    useEffect(() => {
        drawMarkers()
    }, [events])

    const drawMarkers = () => {
        const markers = createMapMarkers(events)
        setEventsMarkers(markers)
    }


    const handleEarthEventClick = (evt) => {
        /**
         * Event model:
         *  id: string, title: string, link: string, closed: string, categories: [], sources:[], geometry:[]
         * **/
        const earthEvtId = evt.target.value
        const selectedEarthEvent = events.filter(({ id }) => id === earthEvtId)[0]
        const { geometry } = selectedEarthEvent
        const newCenterArray = geometry[geometry.length - 1].coordinates
        setSelectedEvent(selectedEarthEvent)
        setCenter(newCenterArray)
        setZoom(4)

        eonetService
            .getLayers(selectedEarthEvent.categories[0].id)
            .then(response => {
                const layers = response.data.categories[0].layers
                    .filter(({ serviceTypeId }) => serviceTypeId.indexOf('WMTS') > -1)
                    .map(({ name: layer, serviceUrl, serviceTypeId, parameters }, index) => {

                        serviceUrl = serviceUrl.indexOf('gibs.earthdata.nasa.gov') > -1
                            ? 'https://gibs-{a-c}.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi'
                            : serviceUrl

                        return {
                            id: layer,
                            config: {
                                url: `${serviceUrl}?TIME=2022-03-01T00:00:00Z`,
                                layer,
                                format: parameters[0].FORMAT,
                                matrixSet: parameters[0].TILEMATRIXSET,
                                tileGrid: wmtsTileGrid
                            },
                            showLayer: false
                        }
                    })
                console.table(layers)
                setLayers([presipitationRateLayer, ...layers])
            })
    }

    const toggleLayerVisibility = (layerVisibility) => {

        const updatedLayersVisibility = layers.map(layer => {
            if (layer.id === layerVisibility.id) layer.showLayer = !layer.showLayer
            return layer
        })

        setLayers(updatedLayersVisibility)
    }

    return (
        <>
            <Form>
                {
                    layers.map((layer) => {
                        return (
                            <Form.Check
                                key={`inline-switch-${layer.id}`}
                                inline
                                type="switch"
                                id={`inline-switch-${layer.id}`}
                                label={layer.config.layer}
                                checked={layer.showLayer}
                                onChange={() => toggleLayerVisibility(layer)}
                            />
                        )
                    })
                }
            </Form>
            <Map
                center={center}
                setCenter={setCenter}
                zoom={zoom}
                projection={mapProj}
                maxResolution={0.5625}
                extent={[-180, -90, 180, 90]}
            >
                <MapLayers>
                    <MapTileLayer key="base-1" source={baseLayerConfig} />
                    {layers.map(layer => {
                        return (
                            layer.showLayer && (<MapTileLayer key={layer.id} source={wmts(layer.config)} />)
                        )
                    })}
                    <VectorLayer source={vector({ features: eventsMarkers })} />
                </MapLayers>
                <MapControls>
                    <FullScreenControl />
                </MapControls>
            </Map>
            <Container>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="earthEventsList">Earth Events List</Form.Label>
                        <Form.Select id="earthEventsList" onChange={handleEarthEventClick}>
                            {events.map(earthEvt => (
                                <option key={earthEvt.id} value={earthEvt.id}>{earthEvt.title}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Container>
        </>
    )
}

export default EarthPage