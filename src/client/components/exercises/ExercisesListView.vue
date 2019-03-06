<template>
	<div class="ExercisesListView view">
		<h1>Exercises</h1>

		<div class="view_section">
			<router-link
				class="button is-primary"
				:to="{ name: 'exerciseNew' }"
			>
				New exercise
			</router-link>
		</div>

		<div class="view_section">
			<SearchInput
				autoSearch
				placeholder="Search for exercises"
				:initialValue="searchString"
				@search="onSearch($event)"
			/>
		</div>

		<div class="view_section">
			<Loader
				v-if="isLoading"
				dark
			/>

			<ExercisesTable
				v-if="!isLoading && loadOccurred"
				:exercises="exercises"
			/>
		</div>
	</div>
</template>

<script>
import logger from '../../common/logger';
import exerciseService from '../../services/exerciseService';
import notificationService from '../../services/notificationService';

import Loader from '../common/Loader';
import SearchInput from '../common/SearchInput';
import ExercisesTable from './ExercisesTable';

export default {
	name: 'ExercisesListView',
	components: {
		Loader,
		SearchInput,
		ExercisesTable,
	},
	methods: {
		onSearch ({ searchString }) {
			this.searchString = searchString;
			this.loadExercises();
		},

		loadExercises () {
			this.isLoading = true;
			this.loadOccurred = true;
			exerciseService.getMany({ searchString: this.searchString })
				.then(exercises => this.exercises = exercises)
				.catch(error => {
					notificationService.error('Sorry, but an error occured.');
					logger.error(error);
				})
				.finally(() => this.isLoading = false);
		},
	},
	data () {
		return {
			isLoading: false,
			loadOccurred: false,
			searchString: '',
			exercises: [],
		};
	},
};
</script>
