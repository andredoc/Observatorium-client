import axios from "axios"

class MarsService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_NASA_MARS_BASE_URL}`
        })
    }

    getPicture() {
        return this.api.get(`mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
    }
}

const marsService = new MarsService()

export default marsService