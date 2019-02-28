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
			this.foodSearchString = searchString;
		},

		emitInput (value) {
			this.$emit('input', value);
		},
	},
	props: {
		value: {
			default: () => [],
			type: Array,
		},
	},
	watch: {
		calculatorModel (newValue) {
			this.emitInput(newValue);
		},
		value (newValue) {
			this.calculatorModel = newValue;
		},
	},
	data () {
		return {
			calculatorModel: this.value,
			foodModel: [],
			foodSearchString: undefined,
		};
	},
};
</script>
