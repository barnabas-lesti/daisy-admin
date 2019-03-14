<template>
	<div class="CalculatorTable">
		<div class="table table-fullWidth">
			<div class="CalculatorTable_tableHeader table_header">
				<div class="table_row">
					<div class="table_cell">{{ $t('calculator.table.header.name') }}</div>
					<div class="table_cell">{{ $t('calculator.table.header.serving') }}</div>
					<div class="table_cell">{{ $t('calculator.table.header.calories') }}</div>
					<div class="table_cell">{{ $t('calculator.table.header.carbs') }}</div>
					<div class="table_cell">{{ $t('calculator.table.header.protein') }}</div>
					<div class="table_cell">{{ $t('calculator.table.header.fat') }}</div>
					<div class="table_cell"></div>
				</div>

				<div class="CalculatorTable_tableRow CalculatorTable_tableRow-summary table_row">
					<div class="table_cell">{{ $t('calculator.table.header.summary') }}</div>
					<div class="table_cell"></div>
					<div class="table_cell">{{ `${nutritionSummary.calories.toFixed(0)} ${$t('common.units.calories')}` }}</div>
					<div class="table_cell">{{ `${nutritionSummary.carbs.toFixed(0)} ${$t('common.units.grams')}` }}</div>
					<div class="table_cell">{{ `${nutritionSummary.protein.toFixed(0)} ${$t('common.units.grams')}` }}</div>
					<div class="table_cell">{{ `${nutritionSummary.fat.toFixed(0)} ${$t('common.units.grams')}` }}</div>
					<div class="table_cell"></div>
				</div>
				<div class="CalculatorTable_tableRow CalculatorTable_tableRow-summary
					CalculatorTable_tableRow-summaryPercent table_row">
					<div class="table_cell"></div>
					<div class="table_cell"></div>
					<div class="table_cell"></div>
					<div class="table_cell">{{ `${nutritionSummaryPercentages.carbs.toFixed(0)} ${$t('common.units.percent')}` }}</div>
					<div class="table_cell">{{ `${nutritionSummaryPercentages.protein.toFixed(0)} ${$t('common.units.percent')}` }}</div>
					<div class="table_cell">{{ `${nutritionSummaryPercentages.fat.toFixed(0)} ${$t('common.units.percent')}` }}</div>
					<div class="table_cell"></div>
				</div>
			</div>
			<div class="table_body">
				<div
					v-for="(item, index) of value"
					class="CalculatorTable_tableRow table_row"
					:key="index">
					<div class="table_cell">{{ item.name }}</div>
					<div class="table_cell">
						<div class="CalculatorTable_serving">
							<input
								v-model="item.serving.value"
								class="CalculatorTable_servingInput input"
								type="number"
							/>
							<span>{{ item.serving.unit }}</span>
						</div>
					</div>
					<div class="table_cell">{{ servingMultipliedMacroDisplay[index].calories }}</div>
					<div class="table_cell">{{ servingMultipliedMacroDisplay[index].carbs }}</div>
					<div class="table_cell">{{ servingMultipliedMacroDisplay[index].protein }}</div>
					<div class="table_cell">{{ servingMultipliedMacroDisplay[index].fat }}</div>
					<div class="table_cell">
						<div class="CalculatorTable_rowActions">
							<div
								class="CalculatorTable_action"
								@click="onDeleteClick(index)"
							>
								<Icon type="trash" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import calculatorService from '../../services/calculatorService';

import Icon from '../common/Icon';

export default {
	name: 'CalculatorTable',
	components: {
		Icon,
	},
	props: {
		value: {
			default: () => [],
			type: Array,
		},
	},
	methods: {
		getServingMultipliedMacro: (macro, serving) => calculatorService.getServingMultipliedMacro(macro, serving),
		removeItem (toRemoveIndex) {
			this.emitInput(this.value.splice(0).filter((item, index) => index !== toRemoveIndex));
		},

		onDeleteClick (index) {
			this.removeItem(index);
		},

		emitInput (newValue) {
			this.$emit('input', newValue);
		},
	},
	computed: {
		servingMultipliedMacroDisplay () {
			return this.value.map(({ nutrients, serving }) => {
				const calories = this.getServingMultipliedMacro(nutrients.calories, serving);
				const carbs = this.getServingMultipliedMacro(nutrients.carbs, serving);
				const protein = this.getServingMultipliedMacro(nutrients.protein, serving);
				const fat = this.getServingMultipliedMacro(nutrients.fat, serving);
				return {
					calories: calories ? `${calories.toFixed(2)} ${this.$t('common.units.calories')}` : '',
					carbs: carbs ? `${carbs.toFixed(2)} ${this.$t('common.units.grams')}` : '',
					protein: protein ? `${protein.toFixed(2)} ${this.$t('common.units.grams')}` : '',
					fat: fat ? `${fat.toFixed(2)} ${this.$t('common.units.grams')}` : '',
				};
			});
		},
		nutritionSummary () {
			return calculatorService.getNutritionSummaryFromCalculatorItems(this.value);
		},
		nutritionSummaryPercentages () {
			return calculatorService.getNutritionSummaryPercentagesFromNutritionSummary(this.nutritionSummary);
		},
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/mixins.less';

.CalculatorTable {
	@_summaryBgColor: #a8d6f5;
	@_summaryBorderColor: #91cbf2;

	min-height: 15rem;

	&_tableRow {
		&-summary {
			font-weight: 600;
			font-size: 1.2rem;
			background-color: @_summaryBgColor;
			border-color: @_summaryBorderColor;
		}

		&-summaryPercent {
			font-size: 1rem;
		}

		&:hover {
			.CalculatorTable_rowActions {
				opacity: 1;
			}
		}
	}

	&_tableHeader {
		border-color: @_summaryBorderColor;
	}

	&_serving {
		display: flex;
		align-items: center;
	}

	&_servingInput {
		margin-right: .25rem;
		max-width: 5rem;
	}

	&_rowActions {
		.transition(opacity);
		opacity: .3;
	}

	&_action {
		.transition(opacity);
		opacity: .5;

		&:hover {
			opacity: 1;
			cursor: pointer;
		}
	}
}
</style>
