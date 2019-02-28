import httpService from './httpService';

class RecipesService {
	async save (recipe) {
		const result = await httpService.put('/recipes', recipe);
		return result;
	}

	async getOne (_id) {
		const recipe = await httpService.get(`/recipes/${_id}`);
		return recipe;
	}

	async getMany ({ searchString = '' }) {
		const searchQuery = searchString;
		const recipe = await httpService.get(`/recipes`, { searchQuery });
		return recipe;
	}

	async update (_id, update) {
		const result = await httpService.patch(`/recipes/${_id}`, update);
		return result;
	}

	async delete (_id) {
		const result = await httpService.delete(`/recipes/${_id}`);
		return result;
	}
}

const recipesService = new RecipesService();
export default recipesService;
