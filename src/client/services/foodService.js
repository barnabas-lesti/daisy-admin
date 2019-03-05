import httpService from './httpService';

const DEFAULT_COUNT = 20;
const DEFAULT_SORT_ORDER = 'asc';

class FoodService {
	async save (food) {
		const result = await httpService.put('/food', food);
		return result;
	}

	async getOne (_id) {
		const food = await httpService.get(`/food/${_id}`);
		return food;
	}

	async getMany ({
		count = DEFAULT_COUNT,
		sortOrder = DEFAULT_SORT_ORDER,
		searchString,
	}) {
		const searchQuery = searchString || undefined;
		const food = await httpService.get(`/food`, {
			count,
			sortOrder,
			searchQuery,
		});
		return food;
	}

	async update (_id, update) {
		const result = await httpService.patch(`/food/${_id}`, update);
		return result;
	}

	async delete (_id) {
		const result = await httpService.delete(`/food/${_id}`);
		return result;
	}
}

const foodService = new FoodService();
export default foodService;
