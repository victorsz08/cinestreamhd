import axios from "axios";
import "dotenv/config";


const token = process.env.TOKEN || "";


const api = axios.create({
    method: 'GET',
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        language: 'pt-br'
    },
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
    }
});


api.interceptors.request.use(function (config) {
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }, function (error) {

    console.log('Erro no interceptor do axios')
    return Promise.reject(error);
  });


export default api;