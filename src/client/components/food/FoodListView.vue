<template>
	<div class="FoodListView view">
		<h1>Food</h1>

		<div class="view_section">
			<router-link
				class="button button-primary"
				:to="{ name: 'foodNew' }"
			>
				New food
			</router-link>
		</div>

		<div class="view_section">
			<SearchInput
				autoSearch
				placeholder="Search for food"
				:initialValue="searchString"
				@search="onSearch($event)"
			/>
		</div>

		<div class="view_section">
			<Loader
				v-if="isLoading"
				dark
			/>

			<FoodTable
				v-if="!isLoading && loadOccurred"
				:food="food"
			/>
		</div>
	</div>
</template>

<script>
import logger from '../../common/logger';
import foodService from '../../services/foodService';
import notificationService from '../../services/notificationService';

import Loader from '../common/Loader';
import SearchInput from '../common/SearchInput';
import FoodTable from './FoodTable';

export default {
	name: 'FoodListView',
	components: {
		Loader,
		SearchInput,
		FoodTable,
	},
	methods: {
		onSearch ({ searchString }) {
			this.searchString = searchString;
			this.loadFood();
		},

		loadFood () {
			this.isLoading = true;
			this.loadOccurred = true;
			foodService.getMany({ searchString: this.searchString })
				.then(food => this.food = food)
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
			food: [],
		};
	},
};
</script>
