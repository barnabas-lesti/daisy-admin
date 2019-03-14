<template>
	<div class="RecipesViewSingle view">
		<h1>{{ recipe.name || $t('recipes.view.newRecipeDefaultTitle') }}</h1>

		<LoadingOverlay
			v-if="isLoading"
			light
		/>

		<div class="view_section">
			<button
				class="view_action button button-primary"
				@click="onSaveButtonClick()"
			>
				{{ $t('recipes.view.saveButton') }}
			</button>
			<button
				v-if="recipe._id"
				class="view_action button button-danger"
				@click="onDeleteButtonClick()"
			>
				{{ $t('recipes.view.deleteButton') }}
			</button>
		</div>

		<div class="view_section">
			<div class="control">
				<label class="label">{{ $t('recipes.view.form.name') }}</label>
				<input
					v-model="recipe.name"
					class="input"
					type="text"
				/>
			</div>
		</div>

		<div class="view_section">
			<Calculator
				v-model="calculatorModel"
				onlyFoodSelector
			/>
		</div>

		<div class="view_section">
			<div class="control">
				<label class="label">{{ $t('recipes.view.form.description') }}</label>
				<textarea
					v-model="recipe.description"
					class="input input-textarea"
				></textarea>
			</div>
		</div>
	</div>
</template>

<script>
import logger from '../../common/logger';
import Recipe from '../../models/Recipe';
import recipeService from '../../services/recipeService';
import calculatorService from '../../services/calculatorService';
import notificationService from '../../services/notificationService';

import LoadingOverlay from '../common/LoadingOverlay';
import Calculator from '../calculator/Calculator';

export default {
	name: 'RecipesViewSingle',
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
				? recipeService.update(this.recipe._id, this.recipe) : recipeService.save(this.recipe);
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
					notificationService.success('recipes.view.notifications.saved');
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('common.notifications.unknownErrorOccurred');
				})
				.finally(() => this.isLoading = false);
		},
		deleteRecipe () {
			this.isLoading = true;
			recipeService.delete(this.recipe._id)
				.then(() => {
					this.$router.push({ name: 'recipes' });
					notificationService.success('recipes.view.notifications.deleted');
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('common.notifications.unknownErrorOccurred');
					this.isLoading = false;
				});
		},
		loadRecipe (_id) {
			this.isLoading = true;
			recipeService.getOne(_id)
				.then(recipe => {
					this.recipe = recipe;
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('common.notifications.unknownErrorOccurred');
				})
				.finally(() => this.isLoading = false);
		},
	},
	computed: {
		calculatorModel: {
			get () {
				return this.recipe.items.map(item => calculatorService.convertRecipeItemToCalculatorItem(item));
			},
			set (newValue) {
				this.recipe.items = newValue.map(item => calculatorService.convertCalculatorItemToRecipeItem(item));
			},
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
