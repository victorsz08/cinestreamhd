import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDQxMjRkMjgxNTliOTNjMTg1OWYzMDEzMzdlNjVhMyIsInN1YiI6IjY0NTkyNzE0YWUzODQzMDE3MmRkYjdiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bnbQvCvQnvV7n3cuKTbZoHwrvq2FBWWpn322wuoZpDs";


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