import axios from "axios"

class UserService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/user` })

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }

    editProfile = credentials => {
        return this.api.put("/editProfile", credentials)
    }

    deleteUser = id => {
        return this.api.delete(`/deleteUser/${id}`)
    }


    verify = token => {
        return this.api.get("/verify", {headers: { Authorization: `Bearer ${token}`}})
    }
}

const userService = new UserService()

export default userService