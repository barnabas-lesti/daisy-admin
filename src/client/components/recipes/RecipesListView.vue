<template>
	<div class="RecipesListView view">
		<h1>Recipes</h1>

		<div class="view_section">
			<router-link
				class="button is-primary"
				:to="{ name: 'recipeNew' }"
			>
				New recipe
			</router-link>
		</div>

		<div class="view_section">
			<SearchInput
				autoSearch
				placeholder="Search for recipes"
				:initialValue="searchString"
				@search="onSearch($event)"
			/>
		</div>

		<div class="view_section">
			<Loader
				v-if="isLoading"
				dark
			/>

			<RecipesTable
				v-if="!isLoading && loadOccurred"
				:recipes="recipes"
			/>
		</div>
	</div>
</template>

<script>
import logger from '../../common/logger';
import recipeService from '../../services/recipeService';
import notificationService from '../../services/notificationService';

import Loader from '../common/Loader';
import SearchInput from '../common/SearchInput';
import RecipesTable from './RecipesTable';

export default {
	name: 'RecipesListView',
	components: {
		Loader,
		SearchInput,
		RecipesTable,
	},
	methods: {
		onSearch ({ searchString }) {
			this.loadRecipes(searchString);
		},

		loadRecipes (searchString) {
			this.isLoading = true;
			this.loadOccurred = true;
			recipeService.getMany({ searchString })
				.then(recipes => this.recipes = recipes)
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
			recipes: [],
		};
	},
};
</script>
