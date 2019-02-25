<template>
	<div class="CalculatorView">
		<h1>Calculator</h1>

		<div class="columns">
			<div class="column is-three-quarters">
				<CalculatorTable
					v-model="calculatorModel"
				/>
			</div>
			<div class="column">
				<CalculatorFoodSelector
					v-model="foodModel"
					:searchString="foodSearchString"
					class="CalculatorView_foodSelector"
					@select="onFoodSelect($event)"
					@search="onFoodSearch($event)"
				/>
			</div>
		</div>

	</div>
</template>

<script>
import storageService from '../../services/storageService';

import CalculatorFoodSelector from './CalculatorFoodSelector';
import CalculatorTable from './CalculatorTable';

const CALCULATOR_MODEL_STORAGE_KEY = 'CalculatorView.calculatorModel';
const FOOD_MODEL_STORAGE_KEY = 'CalculatorView.foodModel';
const FOOD_SEARCH_STRING_STORAGE_KEY = 'CalculatorView.foodSearchString';

export default {
	name: 'CalculatorView',
	components: {
		CalculatorFoodSelector,
		CalculatorTable,
	},
	methods: {
		onFoodSelect ({ selectedFood }) {
			this.calculatorModel.push(selectedFood);
		},
		onFoodSearch ({ searchString }) {
			this.foodSearchString = searchString;
		},
	},
	watch: {
		calculatorModel (newValue) {
			storageService.saveToLocalStorage(CALCULATOR_MODEL_STORAGE_KEY, newValue);
		},
		foodModel (newValue) {
			storageService.saveToLocalStorage(FOOD_MODEL_STORAGE_KEY, newValue);
		},
		foodSearchString (newValue) {
			storageService.saveToLocalStorage(FOOD_SEARCH_STRING_STORAGE_KEY, newValue);
		},
	},
	data () {
		return {
			calculatorModel: [],
			foodModel: [],
			foodSearchString: undefined,
		};
	},
	created () {
		this.calculatorModel = storageService.fetchFromLocalStorage(CALCULATOR_MODEL_STORAGE_KEY) || [];
		this.foodModel = storageService.fetchFromLocalStorage(FOOD_MODEL_STORAGE_KEY) || [];
		this.foodSearchString = storageService.fetchFromLocalStorage(FOOD_SEARCH_STRING_STORAGE_KEY) || '';
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/partials';
@import (reference) '../../styles/variables';

.CalculatorView {
	&:extend(.page all);

	&_foodSelector {
		margin-top: 6rem;
	}
}
</style>
