<template>
	<div class="CalculatorMain">
		<div class="columns">
			<div class="column is-three-quarters">
				<CalculatorTable v-model="calculatorModel" />
			</div>
			<div class="column">
				<CalculatorFoodSelector
					v-model="foodModel"
					class="CalculatorView_foodSelector"
					:searchString="foodSearchString"
					@select="onFoodSelect($event)"
					@search="onFoodSearch($event)"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import RecipeItem from '../../models/RecipeItem';

import CalculatorFoodSelector from './CalculatorFoodSelector';
import CalculatorTable from './CalculatorTable';

export default {
	name: 'CalculatorMain',
	components: {
		CalculatorFoodSelector,
		CalculatorTable,
	},
	methods: {
		onFoodSelect ({ selectedFood }) {
			this.calculatorModel.push(new RecipeItem(selectedFood));
		},
		onFoodSearch ({ searchString }) {
			this.emitFoodSearch(searchString);
		},

		emitInput (value) {
			this.$emit('input', value);
		},
		emitFoodSearch ({ searchString, food }) {
			this.$emit('foodSearch', { searchString, food });
		},
	},
	props: {
		value: {
			default: () => [],
			type: Array,
		},
		foodModel: {
			default: () => [],
			type: Array,
		},
		foodSearchString: String,
	},
	data () {
		return {};
	},
};
</script>
