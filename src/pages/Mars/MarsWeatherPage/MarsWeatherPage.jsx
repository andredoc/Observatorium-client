import { useState, useEffect } from "react"
import weatherService from "../../../services/weather.service"
import { Carousel } from "react-bootstrap"
import "./MarsWeatherPage.css"

function MarsWeatherPage() {

    const [weather, setWeather] = useState([])

    useEffect(() => {
        weatherService
            .getWeather()
            .then(({ data }) => {
                setWeather(data.soles)
            })
    }, [])

    return (
        <div className="carouselDiv">
            <Carousel fade>
                {
                    weather.map((soles) => {
                        return (
                            <Carousel.Item key={soles.id} interval={1000}>
                                <img
                                    className="d-block w-100"
                                    src="https://s.w-x.co/ron-miller-mars-channel-dust-storm_980x551.jpg"
                                    alt="picture"
                                    style={{ height: 640, objectFit: "cover" }}
                                />
                                <Carousel.Caption>
                                    <h3 style={{ fontSize: "4em" }}>Sol {soles.sol}</h3>
                                    <p style={{ fontSize: "3em" }}>Earth Date: {soles.terrestrial_date}</p>
                                    <hr />
                                    <p style={{ fontSize: "2em" }}>High: {soles.max_temp}° C</p>
                                    <p style={{ fontSize: "2em" }}>Low: {soles.min_temp}° C</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel >
        </div>
    )
}

export default MarsWeatherPage