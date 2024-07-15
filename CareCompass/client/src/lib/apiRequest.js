import axios from "axios";

const apiRequest = axios.create({
    baseURL: "http://localhost:5100/api",
    withCredentials : true,
});


export default apiRequest;