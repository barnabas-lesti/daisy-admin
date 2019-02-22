<template>
	<div class="CalculatorView">
		<h1>Calculator</h1>

		<div class="columns">
			<div class="column">
				<FoodTable
					@select="onFoodSelect($event)"
					autoSearch
				/>
			</div>
		</div>

		<div class="columns">
			<div class="column">
				<CalculatorTable :value="tableData" />
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
		onFoodSelect ({ selectedItem }) {
			this.tableData.push(selectedItem);
		},
	},
	data () {
		return {
			tableData: [],
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
