import httpService from './httpService';

class FoodService {
	async save (food) {
		const result = await httpService.post('/food', food);
		return result;
	}

	// getOne (id) {}

	async getMany ({ searchString = '' }) {
		const searchQuery = searchString;
		const food = await httpService.get(`/food`, { searchQuery });
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
}

const foodService = new FoodService();
export default foodService;
