import axios from "axios"

class RatingService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/rating` })

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }

    getAllComments() {
        return this.api.get(`/getAllComments`)
    }

    getItemComments(id) {
        return this.api.get(`/getItemComments/${id}`)
    }

    getUserComments (id) {
        return this.api.get(`/getUserComments/${id}`)
    }

    createComment(id, comment) {
        return this.api.post(`/createComment/${id}`, comment)
    }

    deleteComment(id) {
        return this.api.delete(`/deleteComment/${id}`)
    }

    editComment(commentId, comment) {
        return this.api.put(`/editComment/${commentId}`, comment)
    }

    addRating(id) {
        return this.api.post(`/addRating/${id}`)
    }
}

const ratingService = new RatingService()

export default ratingService