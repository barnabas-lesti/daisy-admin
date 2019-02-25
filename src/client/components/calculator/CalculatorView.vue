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
					autoLoad
					class="CalculatorView_foodSelector"
					@select="onFoodSelect($event)"
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
	},
	data () {
		return {
			calculatorModel: [],
		};
	},
	created () {
		this.calculatorModel = storageService.fetchFromLocalStorage(CALCULATOR_MODEL_STORAGE_KEY) || [];
	},
	beforeDestroy () {
		storageService.saveToLocalStorage(CALCULATOR_MODEL_STORAGE_KEY, this.calculatorModel);
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
