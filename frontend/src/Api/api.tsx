import axios from "axios";

const api = axios.create({
    baseURL:"https://localhost:6060/api",
    withCredentials: true
})

export default api