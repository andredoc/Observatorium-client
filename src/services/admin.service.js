import axios from "axios"

class AdminService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/admin` })

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }

    getAllUsers = () => {
        return this.api.get("/getAllUsers")
    }
}

const adminService = new AdminService()

export default adminService