<template>
	<div class="Calculator">
		<div class="field">
			<CalculatorTable v-model="computedValue" />
		</div>
		<div class="field">
			<Accordion :label="$t('calculator.selectors.food.accordionLabel')">
				<CalculatorFoodSelector @select="onFoodSelect($event)" />
			</Accordion>
		</div>
	</div>
</template>

<script>
import RecipeItem from '../../models/RecipeItem';

import Accordion from '../common/Accordion';
import CalculatorFoodSelector from './CalculatorFoodSelector';
import CalculatorTable from './CalculatorTable';

export default {
	name: 'Calculator',
	components: {
		Accordion,
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
