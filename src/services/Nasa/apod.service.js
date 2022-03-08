import axios from "axios"

class ApodService {

    constructor(){
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_NASA_APOD_BASE_URL}`})
    }

    getPictureOfDay(){
        return this.api.get(`?api_key=${process.env.REACT_APP_NASA_API_KEY}`)
    }
}

const apodService = new ApodService()

export default apodService