<template>
	<div class="ExercisesSingleView view">
		<h1>{{ exercise.name || 'New Exercise' }}</h1>

		<LoadingOverlay
			v-if="isLoading"
			light
		/>

		<div class="view_section">
			<button
				class="view_action button is-primary"
				@click="onSaveButtonClick()"
			>
				Save exercise
			</button>
			<button
				v-if="exercise._id"
				class="view_action button is-danger"
				@click="onDeleteButtonClick()"
			>
				Delete exercise
			</button>
		</div>



		<div class="view_section">
			<Input
				v-model="exercise.name"
				label="Name"
				type="text"
			/>
			<Input
				v-model="exercise.description"
				label="Description"
				type="textarea"
			/>
			<Input
				v-model="exercise.calorieBurn.value"
				label="Calorie burn"
				postfix="kcal"
			/>
			<Input
				v-model="exercise.activity.duration.value"
				label="Duration"
				:postfix="exercise.activity.duration.value > 1 ? 'mins': 'min'"
			/>
			<Input
				v-model="exercise.activity.reps.value"
				label="Repetitions"
				:postfix="exercise.activity.reps.value > 1 ? 'reps': 'rep'"
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
					notificationService.success('Exercise successfully saved.');
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('Sorry, but an error occured.');
				})
				.finally(() => this.isLoading = false);
		},
		deleteExercise () {
			this.isLoading = true;
			exerciseService.delete(this.exercise._id)
				.then(() => {
					this.$router.push({ name: 'exercises' });
					notificationService.success('Exercise successfully deleted.');
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('Sorry, but an error occured.');
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
					notificationService.error('Sorry, but an error occured.');
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
