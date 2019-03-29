<template>
	<div class="DiaryDayView view">
		<h1>{{ `${date.year} ${date.month} ${date.day}` }}</h1>

		<LoadingOverlay
			v-if="isLoading"
			light
		/>

		<div class="view_section">
			<button
				class="view_action button button-primary"
				@click="onSaveButtonClick()"
			>
				{{ $t('diary.view.saveButton') }}
			</button>
			<button
				v-if="diaryDay._id"
				class="view_action button button-danger"
				@click="onDeleteButtonClick()"
			>
				{{ $t('diary.view.deleteButton') }}
			</button>
		</div>

		<div class="view_section">
			<Input
				v-model="diaryDay.notes"
				type="textarea"
				:label="$t('diary.view.form.notes')"
			/>
		</div>

	</div>
</template>

<script>
import logger from '../../common/logger';
import DiaryDay from '../../models/DiaryDay';
import diaryService from '../../services/diaryService';
import notificationService from '../../services/notificationService';

import Input from '../common/Input';
import LoadingOverlay from '../common/LoadingOverlay';

export default {
	name: 'DiaryDayView',
	components: {
		Input,
		LoadingOverlay,
	},
	methods: {
		onSaveButtonClick () {
			this.saveDiaryDay();
		},
		onDeleteButtonClick () {
			this.deleteDiaryDay();
		},

		saveDiaryDay () {
			this.isLoading = true;
			const operationPromise = this.diaryDay._id
				? diaryService.update(this.diaryDay._id, this.diaryDay) : diaryService.save(this.diaryDay);
			operationPromise
				.then(diaryDay => {
					this.diaryDay = diaryDay;
					notificationService.success('diary.view.notifications.saved');
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('common.notifications.unknownErrorOccurred');
				})
				.finally(() => this.isLoading = false);
		},
		deleteDiaryDay () {
			this.isLoading = true;
			diaryService.delete(this.diaryDay._id)
				.then(() => {
					this.$router.push({
						name: 'diaryMonth',
						date: this.date,
					});
					notificationService.success('diary.view.notifications.deleted');
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('common.notifications.unknownErrorOccurred');
					this.isLoading = false;
				});
		},
		loadDiaryDay (date) {
			this.isLoading = true;
			diaryService.getOneByDate(date)
				.then(diaryDay => {
					this.diaryDay = diaryDay;
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('common.notifications.unknownErrorOccurred');
				})
				.finally(() => this.isLoading = false);
		},
	},
	data () {
		return {
			date: {},
			diaryDay: new DiaryDay(),
			isLoading: false,
		};
	},
	created () {
		const { year, month, day, diaryDay } = this.$route.params;
		this.date = { year, month, day };

		if (diaryDay) {
			this.diaryDay = diaryDay;
		} else {
			this.loadDiaryDay(this.date);
		}
	},
};
</script>
