<template>
	<div class="ExercisesListView view">
		<h1>{{ $t('views.exercises.title') }}</h1>

		<div class="view_section">
			<router-link
				class="button button-primary"
				:to="{ name: 'exerciseNew' }"
			>
				{{ $t('views.exercises.newButton') }}
			</router-link>
		</div>

		<div class="view_section">
			<SearchInput
				autoSearch
				:placeholder="$t('views.exercises.searchPlaceholder')"
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
					notificationService.error('notifications.unknownErrorOccurred');
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
