import httpService from './httpService';

class FoodService {
	async save (food) {
		const result = await httpService.put('/food', food);
		return result;
	}

	// getOne (_id) {}

	async getMany ({ searchString = '' }) {
		const searchQuery = searchString;
		const food = await httpService.get(`/food`, { searchQuery });
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
