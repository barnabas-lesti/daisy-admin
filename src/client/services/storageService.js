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

export const StorageKeys = {
	common: {
		LAYOUT: 'common.Layout',
	},

	calculatorView: {
		CALCULATOR_MODEL: 'calculatorView.calculatorModel',
		FOOD_MODEL: 'calculatorView.foodModel',
		FOOD_SEARCH_STRING: 'calculatorView.foodSearchString',
	},
	foodView: {
		FOOD_MODEL: 'foodView.food',
		SEARCH_STRING: 'foodView.searchString',
	},
};

const storageService = new StorageService();
export default storageService;
