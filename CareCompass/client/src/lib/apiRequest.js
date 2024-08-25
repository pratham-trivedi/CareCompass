import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://carecompass-backend.onrender.com/api",
    withCredentials : true,
});


export default apiRequest;