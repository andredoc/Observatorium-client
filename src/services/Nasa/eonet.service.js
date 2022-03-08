import axios from "axios"

class EonetService {
    constructor() {
        this.api = axios.create({ baseURL: process.env.REACT_APP_NASA_EONET_BASE_URL })
    }

    getEvents(queryParams) {
        let url = '/events?'
        Object.keys(queryParams).forEach((key) => {
            url = `${url}${key}=${queryParams[key]}&`
        })

        return this.api.get(url)
    }

    getLayers(categoryId) {
        return this.api.get(`/layers/${categoryId}`)
    }
}

const eonetService = new EonetService()

export default eonetService
