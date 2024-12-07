import axios from 'axios'

const hostname = '10.30.3.50'
const port = 8386

const axiosInstance = axios.create({
	baseURL: 'http://10.30.3.50:8386/api',
	timeout: 10000,
});

axiosInstance.interceptors.request.use(config => {
	return config;
}, error => {
	return Promise.reject(error);
})

export default axiosInstance