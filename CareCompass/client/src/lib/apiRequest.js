import axios from "axios";

const apiRequest = axios.create({
    baseURL: import.meta.env.API_URL,
    withCredentials : true,
});


export default apiRequest;
