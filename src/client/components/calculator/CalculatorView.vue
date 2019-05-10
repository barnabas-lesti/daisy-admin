<template>
	<div class="CalculatorView view">
		<h1>{{ $t('calculator.view.title') }}</h1>

		<div
			class="view_section view_section-description"
			v-html="$t('calculator.view.descriptionHtml')"
		></div>

		<div class="CalculatorView_actions view_section">
			<button
				class="CalculatorView_action button button-primary"
				:disabled="!canSaveAsRecipe"
				@click="onSaveAsRecipeClick()"
			>
				{{ $t('calculator.view.saveAsRecipeButton') }}
			</button>
		</div>

		<div class="view_section">
			<Calculator v-model="calculatorModel" @input="onCalculatorInput()"/>
		</div>
	</div>
</template>

<script>
import calculatorService from '../../services/calculatorService';
import storageService, { StorageKeys } from '../../services/storageService';

import Calculator from './Calculator';

export default {
	name: 'CalculatorView',
	components: {
		Calculator,
	},
	methods: {
		onSaveAsRecipeClick () {
			const recipe = calculatorService.convertCalculatorItemsToRecipe(this.calculatorModel);
			this.$router.push({
				name: 'recipeNew',
				params: { recipe },
			});
		},
		onCalculatorInput () {
			storageService.saveToSessionStorage(
				StorageKeys.calculator.view.CALCULATOR_MODEL,
				this.calculatorModel,
			);
		},
	},
	computed: {
		canSaveAsRecipe () {
			const nonFoodItems = this.calculatorModel.filter(calculatorItem => calculatorItem.type === 'food');
			return this.calculatorModel.length === nonFoodItems.length;
		},
	},
	data () {
		return {
			calculatorModel: [],
		};
	},
	created () {
		this.calculatorModel = storageService.fetchFromSessionStorage(StorageKeys.calculator.view.CALCULATOR_MODEL) || [];
	},
};
</script>

<style lang="less">
.CalculatorView {
	&_action {
		margin-right: 1rem;

		&:last-of-type {
			margin-right: 0;
		}
	}

	&_actions {
		display: flex;
		justify-content: flex-end;
	}
}
</style>
