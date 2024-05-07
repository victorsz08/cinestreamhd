import axios from "axios";


const api = axios.create({
    method: 'GET',
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        language: 'pt-br'
    },
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.tokenBearer}`
    }
});


api.interceptors.request.use(function (config) {
    if (process.env.tokenBearer && config.headers) {
        config.headers.Authorization = `Bearer ${process.env.tokenBearer}`
    }
    return config;
  }, function (error) {

    console.log('Erro no interceptor do axios')
    return Promise.reject(error);
  });


export default api;