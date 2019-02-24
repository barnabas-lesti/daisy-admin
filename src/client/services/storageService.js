class StorageService {
	saveToLocalStorage (key, payload) {
		const dataString = JSON.stringify(payload);
		window.localStorage.setItem(this._prefixKey(key), dataString);
	}

	fetchFromLocalStorage (key) {
		const dataString = window.localStorage.getItem(this._prefixKey(key));
		const data = JSON.parse(dataString);
		return data;
	}

	_prefixKey (key) {
		return `Daisy.${key}`;
	}
}

const storageService = new StorageService();
export default storageService;
