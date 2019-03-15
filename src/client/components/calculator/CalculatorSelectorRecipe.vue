<template>
	<div class="CalculatorSelectorRecipe">
		<div class="field">
			<SearchInput
				:initialValue="searchString"
				:placeholder="$t('calculator.selector.recipe.searchPlaceholder')"
				@search="onSearch($event)"
			/>
		</div>

		<div class="CalculatorSelectorRecipe_searchResult">
			<Loader
				v-if="isLoading"
				dark
			/>

			<p v-else-if="loadOccurred && recipes.length === 0">
				{{ $t('calculator.selector.recipe.noItemsFound') }}
			</p>

			<div v-else>
				<div
					v-for="(item, index) of recipes"
					class="CalculatorSelectorRecipe_item hoverable"
					:key="index"
					@click="onTableRowClick(item)"
				>
					<span>{{ item.name }}</span>
					<span class="CalculatorSelectorRecipe_calories">{{ `${getCalories(item)} ${$t('common.units.calories')}` }}</span>
				</div>
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

import Loader from '../common/Loader';
import SearchInput from '../common/SearchInput';

export default {
	name: 'CalculatorSelectorRecipe',
	components: {
		Loader,
		SearchInput,
	},
	methods: {
		getCalories: recipe => calculatorService.getNutritionSummaryFromRecipe(recipe).calories,
		loadRecipes () {
			this.isLoading = true;
			recipeService.getMany({ searchString: this.searchString })
				.then(recipes => this.recipes = recipes)
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
			this.loadRecipes();
		},

		emitSelect (recipe) {
			this.$emit('select', { recipe: new Recipe(recipe) });
		},
	},
	data () {
		return {
			recipes: [],
			searchString: '',
			isLoading: false,
			loadOccurred: false,
		};
	},
};
</script>

<style lang="less">
.CalculatorSelectorRecipe {
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
