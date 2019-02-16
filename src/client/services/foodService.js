import httpService from './httpService';

class FoodService {
	async save (food) {
		const result = await httpService.post('/food', food);
		return result;
	}

	// getOne (id) {}

	async getMany ({ searchString = '' }) {
		const searchQuery = searchString;
		const responseData = await httpService.get(`/food`, { searchQuery });
		const food = this._convertResponseDataToViewData(responseData);
		return food;
	}

	async update (id, update) {
		const result = await httpService.put(`/food/${id}`, update);
		return result;
	}

	async delete (id) {
		const result = await httpService.delete(`/food/${id}`);
		return result;
	}

	/**
	 * Converts raw response data from the server to view compatible data.
	 *
	 * @param {Object} responseData Response data from the server
	 * @returns {Object} View compatible data
	 */
	_convertResponseDataToViewData (responseData) {
		return responseData.map(item => {
			const {
				_id,
				...otherProps
			} = item;
			return {
				id: _id,
				...otherProps,
			};
		});
	}
}

const foodService = new FoodService();
export default foodService;
