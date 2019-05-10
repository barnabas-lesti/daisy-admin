<template>
	<div class="Calculator">
		<div class="field">
			<Accordion :label="$t('calculator.selector.food.accordionLabel')">
				<CalculatorSelectorFood @select="onFoodSelect($event)" />
			</Accordion>
		</div>
		<div
			v-if="!onlyFoodSelector"
			class="field"
		>
			<Accordion :label="$t('calculator.selector.recipe.accordionLabel')">
				<CalculatorSelectorRecipe @select="onRecipeSelect($event)" />
			</Accordion>
		</div>
		<div
			v-if="!onlyFoodSelector"
			class="field"
		>
			<Accordion :label="$t('calculator.selector.exercise.accordionLabel')">
				<CalculatorSelectorExercise @select="onExerciseSelect($event)" />
			</Accordion>
		</div>
		<div class="field">
			<CalculatorTable
				v-model="computedValue"
				:noTypeIcon="noTypeIcon"
			/>

			<div class="Calculator_addItemButton">
				<Icon type="add" />
			</div>
		</div>

		<CalculatorModal />
	</div>
</template>

<script>
import calculatorService from '../../services/calculatorService';

import Accordion from '../common/Accordion';
import Icon from '../common/Icon';
import CalculatorSelectorFood from './CalculatorSelectorFood';
import CalculatorSelectorRecipe from './CalculatorSelectorRecipe';
import CalculatorSelectorExercise from './CalculatorSelectorExercise';
import CalculatorTable from './CalculatorTable';
import CalculatorModal from './CalculatorModal';

export default {
	name: 'Calculator',
	components: {
		Accordion,
		Icon,
		CalculatorSelectorFood,
		CalculatorSelectorRecipe,
		CalculatorSelectorExercise,
		CalculatorTable,
		CalculatorModal,
	},
	methods: {
		onFoodSelect ({ food }) {
			this.addToVelue(calculatorService.convertFoodToCalculatorItem(food));
		},
		onRecipeSelect ({ recipe }) {
			this.addToVelue(calculatorService.convertRecipeToCalculatorItem(recipe));
		},
		onExerciseSelect ({ exercise }) {
			this.addToVelue(calculatorService.convertExerciseToCalculatorItem(exercise));
		},

		emitInput (value) {
			this.$emit('input', value);
		},

		addToVelue (item) {
			const newValue = this.value.splice(0);
			newValue.push(item);
			this.emitInput(newValue);
		},
	},
	props: {
		onlyFoodSelector: Boolean,
		noTypeIcon: Boolean,
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

<style lang="less">
@import (reference) '../../styles/mixins.less';

.Calculator {
	@_addItemButtonColor: #a8d6f5;
	@_addItemButtonColor-hover: #91cbf2;

	&_addItemButton {
		.transition(color);
		font-size: 3rem;
		color: @_addItemButtonColor;
		text-align: center;
		margin-top: 1rem;

		&:hover {
			color: @_addItemButtonColor-hover;
			cursor: pointer;
		}
	}
}
</style>
