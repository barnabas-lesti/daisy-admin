<template>
	<div class="ExercisesSingleView view">
		<h1>{{ exercise.name || $t('views.exercises.newExerciseDefaultTitle') }}</h1>

		<LoadingOverlay
			v-if="isLoading"
			light
		/>

		<div class="view_section">
			<button
				class="view_action button button-primary"
				@click="onSaveButtonClick()"
			>
				{{ $t('views.exercises.saveButton') }}
			</button>
			<button
				v-if="exercise._id"
				class="view_action button button-danger"
				@click="onDeleteButtonClick()"
			>
				{{ $t('views.exercises.deleteButton') }}
			</button>
		</div>

		<div class="view_section">
			<Input
				v-model="exercise.name"
				type="text"
				:label="$t('views.exercises.form.name')"
			/>
			<Input
				v-model="exercise.calorieBurn.value"
				:label="$t('views.exercises.form.calorieBurn')"
				:postfix="$t('units.calories')"
			/>
			<Input
				v-model="exercise.activity.duration.value"
				:label="$t('views.exercises.form.duration')"
				:postfix="$t('units.minutes', exercise.activity.duration.value)"
			/>
			<Input
				v-model="exercise.activity.reps.value"
				:label="$t('views.exercises.form.repetitions')"
				:postfix="$t('units.repetitions', exercise.activity.reps.value)"
			/>
			<Input
				v-model="exercise.description"
				type="textarea"
				:label="$t('views.exercises.form.description')"
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
	name: 'ExercisesSingleView',
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
					notificationService.success('views.exercises.notifications.saved');
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('notifications.unknownErrorOccurred');
				})
				.finally(() => this.isLoading = false);
		},
		deleteExercise () {
			this.isLoading = true;
			exerciseService.delete(this.exercise._id)
				.then(() => {
					this.$router.push({ name: 'exercises' });
					notificationService.success('views.exercises.notifications.deleted');
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('notifications.unknownErrorOccurred');
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
					notificationService.error('notifications.unknownErrorOccurred');
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
