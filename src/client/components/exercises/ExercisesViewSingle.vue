<template>
	<div class="ExercisesViewSingle view">
		<h1>{{ exercise.name || $t('exercises.view.newExerciseDefaultTitle') }}</h1>

		<LoadingOverlay
			v-if="isLoading"
			light
		/>

		<div class="view_section">
			<button
				class="view_action button button-primary"
				@click="onSaveButtonClick()"
			>
				{{ $t('exercises.view.saveButton') }}
			</button>
			<button
				v-if="exercise._id"
				class="view_action button button-danger"
				@click="onDeleteButtonClick()"
			>
				{{ $t('exercises.view.deleteButton') }}
			</button>
		</div>

		<div class="view_section">
			<Input
				v-model="exercise.name"
				type="text"
				:label="$t('exercises.view.form.name')"
			/>
			<Input
				v-model="exercise.calorieBurn.value"
				:label="$t('exercises.view.form.calorieBurn')"
				:postfix="$t('common.units.calories')"
			/>
			<Input
				v-model="exercise.duration.value"
				:label="$t('exercises.view.form.duration')"
				:postfix="$tc('common.units.minutes', exercise.duration.value)"
			/>
			<Input
				v-model="exercise.description"
				type="textarea"
				:label="$t('exercises.view.form.description')"
			/>
		</div>

	</div>
</template>

<script>
import logger from '../../common/logger';
import Exercise from '../../models/Exercise';
import exerciseService from '../../services/exerciseService';
import notificationService from '../../services/notificationService';

import Input from '../common/Input';
import LoadingOverlay from '../common/LoadingOverlay';

export default {
	name: 'ExercisesViewSingle',
	components: {
		Input,
		LoadingOverlay,
	},
	methods: {
		onSaveButtonClick () {
			this.saveExercise();
		},
		onDeleteButtonClick () {
			this.deleteExercise();
		},

		saveExercise () {
			this.isLoading = true;
			const operationPromise = this.exercise._id
				? exerciseService.update(this.exercise._id, this.exercise) : exerciseService.save(this.exercise);
			operationPromise
				.then(exercise => {
					if (!this.exercise._id) {
						this.exercise = exercise;
						this.$router.push({
							name: 'exerciseEdit',
							params: {
								_id: exercise._id,
								exercise,
							},
						});
					}
					notificationService.success('exercises.view.notifications.saved');
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('common.notifications.unknownErrorOccurred');
				})
				.finally(() => this.isLoading = false);
		},
		deleteExercise () {
			this.isLoading = true;
			exerciseService.delete(this.exercise._id)
				.then(() => {
					this.$router.push({ name: 'exercises' });
					notificationService.success('exercises.view.notifications.deleted');
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('common.notifications.unknownErrorOccurred');
					this.isLoading = false;
				});
		},
		loadExercise (_id) {
			this.isLoading = true;
			exerciseService.getOne(_id)
				.then(exercise => {
					this.exercise = exercise;
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
			exercise: new Exercise(),
			isLoading: false,
		};
	},
	created () {
		const {
			_id,
			exercise,
		} = this.$route.params;
		if (exercise) {
			this.exercise = exercise;
		} else if (_id) {
			this.loadExercise(_id);
		}
	},
};
</script>
