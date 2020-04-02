import Axios, { AxiosRequestConfig } from 'axios';

const contextUrl = "http://localhost:5000";
// Authorization and authentication header for every request
// let jwt = "";

export const ersClient = Axios.create({
    baseURL:contextUrl,
    headers: {
        'Content-Type':"application/json"
    }
});
// if (jwt != "") {
//     ersClient.interceptors.request.use((config:AxiosRequestConfig) => {
//         config.headers.Authorization = jwt;
//         return config;
//     })
// }

// Refresh jwt every time a new user logs in
// export const refreshJwt = (newJwt:string) => {
//     jwt = newJwt;
// }
