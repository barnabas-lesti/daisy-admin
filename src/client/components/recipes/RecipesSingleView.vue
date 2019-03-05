<template>
	<div class="RecipesSingleView view">
		<h1>{{ recipe.name || 'New Recipe' }}</h1>

		<LoadingOverlay
			v-if="isLoading"
			light
		/>

		<div class="view_section">
			<button
				class="view_action button is-primary"
				@click="onSaveButtonClick()"
			>
				Save recipe
			</button>
			<button
				v-if="recipe._id"
				class="view_action button is-danger"
				@click="onDeleteButtonClick()"
			>
				Delete recipe
			</button>
		</div>

		<div class="view_section">
			<div class="control">
				<label class="label">Name</label>
				<input
					v-model="recipe.name"
					class="input"
					type="text"
				/>
			</div>
		</div>

		<div class="view_section">
			<div class="control">
				<label class="label">Description</label>
				<textarea
					v-model="recipe.description"
					class="textarea"
				></textarea>
			</div>
		</div>

		<div class="view_section">
			<Calculator
				v-if="recipe.items"
				v-model="recipe.items"
			/>
		</div>
	</div>
</template>

<script>
import logger from '../../common/logger';
import Recipe from '../../models/Recipe';
import recipesService from '../../services/recipesService';
import notificationService from '../../services/notificationService';

import LoadingOverlay from '../common/LoadingOverlay';
import Calculator from '../calculator/Calculator';

export default {
	name: 'RecipesSingleView',
	components: {
		LoadingOverlay,
		Calculator,
	},
	methods: {
		onSaveButtonClick () {
			this.saveRecipe();
		},
		onDeleteButtonClick () {
			this.deleteRecipe();
		},

		saveRecipe () {
			this.isLoading = true;
			const operationPromise = this.recipe._id
				? recipesService.update(this.recipe._id, this.recipe) : recipesService.save(this.recipe);
			operationPromise
				.then(recipe => {
					if (!this.recipe._id) {
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
					logger.error(error);
					notificationService.error('Sorry, but an error occured.');
				})
				.finally(() => this.isLoading = false);
		},
		deleteRecipe () {
			this.isLoading = true;
			recipesService.delete(this.recipe._id)
				.then(() => {
					this.$router.push({ name: 'recipes' });
					notificationService.success('Recipe successfully deleted.');
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('Sorry, but an error occured.');
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
					logger.error(error);
					notificationService.error('Sorry, but an error occured.');
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
