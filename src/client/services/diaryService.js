import httpService from './httpService';

class DiaryService {
	async save (diaryDay) {
		const result = await httpService.put('/diaryDays', diaryDay);
		return result;
	}

	async getOne (_id) {
		const diaryDay = await httpService.get(`/diaryDays/${_id}`);
		return diaryDay;
	}

	async getOneByDate (date) {
		const diaryDay = await httpService.get('/diaryDays', date);
		return diaryDay;
	}

	async getMany ({ searchString = '' }) {
		const searchQuery = searchString;
		const diaryDays = await httpService.get(`/diaryDays`, { searchQuery });
		return diaryDays;
	}

	async update (_id, update) {
		const result = await httpService.patch(`/diaryDays/${_id}`, update);
		return result;
	}

	async delete (_id) {
		const result = await httpService.delete(`/diaryDays/${_id}`);
		return result;
	}
}

export default new DiaryService();
