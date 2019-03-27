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

	saveToSessionStorage (key, payload) {
		const dataString = JSON.stringify(payload);
		window.sessionStorage.setItem(this._prefixKey(key), dataString);
	}

	fetchFromSessionStorage (key) {
		const dataString = window.sessionStorage.getItem(this._prefixKey(key));
		const data = JSON.parse(dataString);
		return data;
	}

	_prefixKey (key) {
		return `Daisy.${key}`;
	}
}

export const StorageKeys = {
	common: {
		LAYOUT: 'common.layout',
		LOCALE: 'common.locale',
	},

	calculator: {
		view: {
			CALCULATOR_MODEL: 'calculator.view.calculatorModel',
		},
	},
};

const storageService = new StorageService();
export default storageService;
