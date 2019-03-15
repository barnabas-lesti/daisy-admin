<template>
	<div class="CalculatorSelectorExercise">
		<div class="field">
			<SearchInput
				:initialValue="searchString"
				:placeholder="$t('calculator.selector.exercise.searchPlaceholder')"
				@search="onSearch($event)"
			/>
		</div>

		<div class="CalculatorSelectorExercise_searchResult">
			<Loader
				v-if="isLoading"
				dark
			/>

			<p v-else-if="loadOccurred && exercises.length === 0">
				{{ $t('calculator.selector.exercise.noItemsFound') }}
			</p>

			<div v-else>
				<div
					v-for="(item, index) of exercises"
					class="CalculatorSelectorExercise_item hoverable"
					:key="index"
					@click="onTableRowClick(item)"
				>
					<span>{{ item.name }}</span>
					<span class="CalculatorSelectorExercise_calories">{{ `${item.calorieBurn.value} ${$t('common.units.calories')}` }}</span>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import logger from '../../common/logger';
import Exercise from '../../models/Exercise';
import exerciseService from '../../services/exerciseService';
import notificationService from '../../services/notificationService';

import Loader from '../common/Loader';
import SearchInput from '../common/SearchInput';

export default {
	name: 'CalculatorSelectorExercise',
	components: {
		Loader,
		SearchInput,
	},
	methods: {
		loadExercises () {
			this.isLoading = true;
			exerciseService.getMany({ searchString: this.searchString })
				.then(exercises => this.exercises = exercises)
				.catch(error => {
					logger.error(error);
					notificationService.error('common.notifications.unknownErrorOccurred');
				})
				.finally(() => {
					this.isLoading = false;
					this.loadOccurred = true;
				});
		},

		onTableRowClick (item) {
			this.emitSelect(item);
		},
		onSearch ({ searchString }) {
			this.searchString = searchString;
			this.loadExercises();
		},

		emitSelect (exercise) {
			this.$emit('select', { exercise: new Exercise(exercise) });
		},
	},
	data () {
		return {
			exercises: [],
			searchString: '',
			isLoading: false,
			loadOccurred: false,
		};
	},
};
</script>

<style lang="less">
.CalculatorSelectorExercise {
	&_calories {
		float: right;
	}

	&_item {
		padding: .5rem;
	}

	&_searchResult {
		height: 10rem;
		overflow-y: auto;
	}
}
</style>
