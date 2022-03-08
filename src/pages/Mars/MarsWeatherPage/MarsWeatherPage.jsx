import { useState, useEffect } from "react"
import weatherService from "../../../services/weather.service"
import { Carousel } from "react-bootstrap"

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
        <Carousel fade>
            {
                weather.map((soles) => {
                    return (
                        <Carousel.Item key={soles.id} interval={1000}>
                            <img
                                className="d-block w-100"
                                src="https://s.w-x.co/ron-miller-mars-channel-dust-storm_980x551.jpg"
                                alt="picture"
                            />
                            <Carousel.Caption>
                                <h3>Sol {soles.sol}</h3>
                                <p>Earth Date: {soles.terrestrial_date}</p>
                                <hr />
                                <p>High: {soles.max_temp}° C</p>
                                <p>Low: {soles.min_temp}° C</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })
            }
        </Carousel >
    )
}

export default MarsWeatherPage