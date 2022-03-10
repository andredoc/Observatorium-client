import axios from "axios"

class ItemsService {
    constructor() {
        this.api = axios.create({baseURL: `${process.env.REACT_APP_API_URL}/items`})

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken")

            if(storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}`}
            }
            return config
        })
    }

    getAllItems = () => {
        return this.api.get("/getAllItems")
    }

    getUserItems = id => {
        return this.api.get(`/getUserItems/${id}`)
    }

    getOneItem = id => {
        return this.api.get(`/getOneItem/${id}`)
    }

    createItem = item => {
        return this.api.post(`/createItem`, item)
    }

    updateLikeToItem(itemId, like){
        return this.api.put(`/updateLikeToItem/${itemId}`, {like})
    }

    editItem = (item, id) => {
        return this.api.put(`/editItem/${id}`, item)
    }

    deleteItem = id => {
        return this.api.delete(`/deleteItem/${id}`)
    }
}

const itemsService = new ItemsService()

export default itemsService