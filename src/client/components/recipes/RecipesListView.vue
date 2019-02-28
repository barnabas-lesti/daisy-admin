<template>
	<div class="RecipesListView">
		<h1>Recipes</h1>

		<div class="field">
			<button
				class="button is-primary"
				@click="onNewButtonClick()"
			>
				New recipe
			</button>
		</div>

		<div class="field">
			<SearchInput
				autoSearch
				placeholder="Search for recipes"
				:initialValue="searchString"
				@search="onSearch($event)"
			/>
		</div>

		<Loader
			v-if="isLoading"
			dark
		/>

		<div class="field">
			<RecipesCardList
				v-if="!isLoading && recipes && recipes.length"
				:items="recipes"
				@select="onRecipeSelect($event)"
			/>

			<p v-if="recipes && recipes.length > maxNumberOfRecipes">
				More than {{ maxNumberOfRecipes }} recipes were found, {{ recipes.length - maxNumberOfRecipes }}
				{{ (recipes.length - maxNumberOfRecipes) > 1 ? 'recipes are' : 'recipe is' }} not visible.
			</p>

			<p v-if="loadOccurred && recipes && recipes.length === 0">
				No recipes found.
			</p>
		</div>
	</div>
</template>

<script>
import recipesService from '../../services/recipesService';

import Loader from '../common/Loader';
import SearchInput from '../common/SearchInput';
import RecipesCardList from './RecipesCardList';

const MAX_NUMBER_OF_RECIPES = 20;

export default {
	name: 'RecipesListView',
	components: {
		RecipesCardList,
		Loader,
		SearchInput,
	},
	methods: {
		onSearch ({ searchString }) {
			this.loadRecipes(searchString);
		},
		onRecipeSelect ({ selectedItem }) {
			this.navigateToRecipe(selectedItem);
		},
		onNewButtonClick () {
			this.navigateToRecipe();
		},

		loadRecipes (searchString) {
			this.isLoading = true;
			this.loadOccurred = true;
			recipesService.getMany({ searchString })
				.then(recipes => this.recipes = recipes)
				.catch(error => console.log(error))
				.finally(() => this.isLoading = false);
		},
		navigateToRecipe (recipe) {
			if (recipe) {
				this.$router.push({
					name: 'recipeEdit',
					params: {
						_id: recipe._id,
						recipe,
					},
				});
			} else {
				this.$router.push({ name: 'recipeNew' });
			}
		},
	},
	data () {
		return {
			isLoading: false,
			loadOccurred: false,
			searchString: undefined,
			maxNumberOfRecipes: MAX_NUMBER_OF_RECIPES,
			recipes: undefined,
		};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/partials';
@import (reference) '../../styles/variables';

.RecipesListView {
	&:extend(.page all);

	&_list {
		margin-bottom: 1rem;
	}
}
</style>
