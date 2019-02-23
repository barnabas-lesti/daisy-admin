<template>
	<div class="CalculatorView">
		<h1>Calculator</h1>

		<div class="columns">
			<div class="column">
				<CalculatorTable
					onlySummary
					:value="calculatorModel"
				/>
			</div>
		</div>

		<div class="columns">
			<div class="column">
				<FoodTable
					autoLoad
					bordered
					mini
					searchPlaceholder="Search for food..."
					@select="onFoodSelect($event)"
				/>
			</div>
			<div class="column is-three-quarters">
				<CalculatorTable
					noSummary
					:value="calculatorModel"
				/>
			</div>
		</div>

	</div>
</template>

<script>
import FoodTable from '../food/FoodTable';
import CalculatorTable from './CalculatorTable';

export default {
	name: 'CalculatorView',
	components: {
		FoodTable,
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
};
</script>

<style lang="less">
@import (reference) '../../styles/partials';
@import (reference) '../../styles/variables';

.CalculatorView {
	&:extend(.page all);
}
</style>
