<template>
	<div class="RecipesSingleView">
		<h1>{{ recipe.name || 'New Recipe' }}</h1>

		<div class="RecipesSingleView_content">
			<LoadingOverlay
				v-if="isLoading"
				light
			/>
			<div class="field">
				<button
					class="RecipesSingleView_action button is-primary"
					@click="onSaveButtonClick()"
				>
					Save recipe
				</button>
				<button
					v-if="recipe._id"
					class="RecipesSingleView_action button is-danger"
					@click="onDeleteButtonClick()"
				>
					Delete recipe
				</button>
			</div>

			<div class="field">
				<div class="control">
					<label class="label">Name</label>
					<input
						v-model="recipe.name"
						class="input"
						type="text"
					/>
				</div>
			</div>

			<div class="field">
				<div class="control">
					<label class="label">Description</label>
					<textarea
						v-model="recipe.description"
						class="textarea"
					></textarea>
				</div>
			</div>

			<div class="field">
				<CalculatorMain
					v-if="recipe.items"
					v-model="recipe.items"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import Recipe from '../../models/Recipe';
import recipesService from '../../services/recipesService';
import notificationService from '../../services/notificationService';

import LoadingOverlay from '../common/LoadingOverlay';
import CalculatorMain from '../calculator/CalculatorMain';

export default {
	name: 'RecipesSingleView',
	components: {
		LoadingOverlay,
		CalculatorMain,
	},
	methods: {
		onSaveButtonClick () {
			this.saveRecipe(this.recipe);
		},
		onDeleteButtonClick () {
			this.deleteRecipe(this.recipe._id);
		},

		saveRecipe (recipe) {
			this.isLoading = true;
			const operationPromise = recipe._id ? recipesService.update(recipe._id, recipe) : recipesService.save(recipe);
			operationPromise
				.then(recipe => {
					if (recipe._id) {
						this.recipe = recipe;
						this.$router.push({
							name: 'recipeEdit',
							params: {
								_id: recipe._id,
								recipe,
							},
						});
					}
					notificationService.success('Recipe successfully saved.');
				})
				.catch(error => {
					console.error(error);
					notificationService.error('Unknown error occured.');
				})
				.finally(() => this.isLoading = false);
		},
		deleteRecipe (_id) {
			this.isLoading = true;
			recipesService.delete(this.recipe._id)
				.then(() => {
					this.$router.push({ name: 'recipes' });
					notificationService.success('Recipe successfully deleted.');
				})
				.catch(error => {
					console.error(error);
					notificationService.error('Unknown error occured.');
					this.isLoading = false;
				});
		},
		loadRecipe (_id) {
			this.isLoading = true;
			recipesService.getOne(_id)
				.then(recipe => {
					this.recipe = recipe;
				})
				.catch(error => {
					console.error(error);
				})
				.finally(() => this.isLoading = false);
		},
	},
	data () {
		return {
			recipe: new Recipe(),
			isLoading: false,
		};
	},
	created () {
		const {
			_id,
			recipe,
		} = this.$route.params;
		if (recipe) {
			this.recipe = recipe;
		} else if (_id) {
			this.loadRecipe(_id);
		}
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/partials';

.RecipesSingleView {
	&:extend(.page all);

	&_action {
		margin-right: 1rem;

		&:last-child {
			margin-right: 0;
		}
	}
}
</style>
