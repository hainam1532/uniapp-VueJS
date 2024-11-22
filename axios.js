import axios from 'axios'

const hostname = '10.30.3.27'
const port = 8000

const axiosInstance = axios.create({
	baseURL: `http://${hostname}:${port}/api`,
	timeout: 10000,
});

axiosInstance.interceptors.request.use(config => {
	return config;
}, error => {
	return Promise.reject(error);
})

export default axiosInstance