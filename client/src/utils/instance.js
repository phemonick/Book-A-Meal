import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/v1/'
});

instance.interceptors.request.use((config) => {
  config.headers.authorization = localStorage.getItem('myUserToken');
  return config;
});

export default instance;
