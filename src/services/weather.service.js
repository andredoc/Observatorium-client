import axios from "axios"

class WeatherService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_NASA_WEATHER_BASE_URL}`
        })
    }

    getWeather() {
        return this.api.get(`?feed=weather&category=msl&feedtype=json`)
    }

}

const weatherService = new WeatherService()

export default weatherService