import axios from 'axios';
import urlJoin from 'url-join';

const API_BASE_URL = 'http://localhost:8080';

class HttpService {
	async get (url, params) {
		const response = await axios.get(urlJoin(API_BASE_URL, url), { params });
		return response.data;
	}

	async post (url, data) {
		const response = await axios.post(urlJoin(API_BASE_URL, url), data);
		return response.data;
	}

	async put (url, data) {
		const response = await axios.put(urlJoin(API_BASE_URL, url), data);
		return response.data;
	}

	async delete (url) {
		const response = await axios.delete(urlJoin(API_BASE_URL, url));
		return response.data;
	}
}

const httpService = new HttpService();
export default httpService;
