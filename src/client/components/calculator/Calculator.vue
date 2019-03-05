<template>
	<div class="CalculatorMain">
		<div class="columns">
			<div class="column is-three-quarters">
				<CalculatorTable v-model="computedValue" />
			</div>
			<div class="column">
				<CalculatorFoodSelector
					class="CalculatorView_foodSelector"
					@select="onFoodSelect($event)"
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
	name: 'Calculator',
	components: {
		CalculatorFoodSelector,
		CalculatorTable,
	},
	methods: {
		onFoodSelect ({ selectedFood }) {
			const newValue = this.value.splice(0);
			newValue.push(new RecipeItem(selectedFood));
			this.emitInput(newValue);
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
	computed: {
		computedValue: {
			get () {
				return this.value;
			},
			set (newValue) {
				this.emitInput(newValue);
				return newValue;
			},
		},
	},
};
</script>
