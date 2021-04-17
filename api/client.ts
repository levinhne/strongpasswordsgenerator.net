import axios from 'axios';
import queryString from 'query-string';

const client = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "content-type": "application/json"
    },
    paramsSerializer: params => queryString.stringify(params),
});

client.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
});

export default client;