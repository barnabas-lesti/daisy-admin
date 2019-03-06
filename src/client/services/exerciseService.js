import httpService from './httpService';

class ExerciseService {
	async save (exercise) {
		const result = await httpService.put('/exercises', exercise);
		return result;
	}

	async getOne (_id) {
		const exercise = await httpService.get(`/exercises/${_id}`);
		return exercise;
	}

	async getMany ({ searchString = '' }) {
		const searchQuery = searchString;
		const exercises = await httpService.get(`/exercises`, { searchQuery });
		return exercises;
	}

	async update (_id, update) {
		const result = await httpService.patch(`/exercises/${_id}`, update);
		return result;
	}

	async delete (_id) {
		const result = await httpService.delete(`/exercises/${_id}`);
		return result;
	}
}

export default new ExerciseService();
