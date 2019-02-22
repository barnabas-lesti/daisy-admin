<template>
	<div class="CalculatorTable">
		<table class="table is-fullwidth">
			<thead>
				<tr>
					<th>Name</th>
					<th>Serving</th>
					<th>Calories</th>
					<th>Protein</th>
					<th>Fat</th>
					<th>Carbs</th>
				</tr>
			</thead>
			<tbody>
				<tr class="CalculatorTable_summaryRow">
					<td>Summary</td>
					<td></td>
					<td>{{ summaryValues.calories.toFixed(0) }} kcal</td>
					<td>{{ summaryValues.protein.toFixed(0) }} g</td>
					<td>{{ summaryValues.fat.toFixed(0) }} g</td>
					<td>{{ summaryValues.carbs.toFixed(0) }} g</td>
				</tr>
				<tr class="CalculatorTable_summaryRow CalculatorTable_summaryRow-percent">
					<td></td>
					<td></td>
					<td></td>
					<td>{{ summaryPercentages.protein.toFixed(0) }} %</td>
					<td>{{ summaryPercentages.fat.toFixed(0) }} %</td>
					<td>{{ summaryPercentages.carbs.toFixed(0) }} %</td>
				</tr>
				<tr
					v-for="(item, index) in items"
					:key="index"
				>
					<td>{{ item.name }}</td>
					<td>
						<div class="CalculatorTable_serving">
							<input
								class="CalculatorTable_servingInput input"
								type="number"
								v-model="item.serving.value"
							/>
							<span>{{ item.serving.unit }}</span>
						</div>
					</td>
					<td>{{ computedItems[index].macros.calories.value.toFixed(2) }} kcal</td>
					<td>{{ computedItems[index].macros.protein.value.toFixed(2) }} g</td>
					<td>{{ computedItems[index].macros.fat.value.toFixed(2) }} g</td>
					<td>{{ computedItems[index].macros.carbs.value.toFixed(2) }} g</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import Utils from '../../Utils';

export default {
	name: 'CalculatorTable',
	methods: {
		calculateMacroValue: (macro, serving) => macro.servingMultiplier * serving.value,
	},
	props: {
		value: {
			default: () => [],
			type: Array,
		},
	},
	computed: {
		computedItems () {
			return this.items.map(item => {
				item.macros.calories.value = this.calculateMacroValue(item.macros.calories, item.serving);
				item.macros.protein.value = this.calculateMacroValue(item.macros.protein, item.serving);
				item.macros.fat.value = this.calculateMacroValue(item.macros.fat, item.serving);
				item.macros.carbs.value = this.calculateMacroValue(item.macros.carbs, item.serving);
				return item;
			});
		},
		summaryValues () {
			return {
				calories: Utils.sumArrayValues(this.computedItems.map(item => item.macros.calories.value)),
				protein: Utils.sumArrayValues(this.computedItems.map(item => item.macros.protein.value)),
				fat: Utils.sumArrayValues(this.computedItems.map(item => item.macros.fat.value)),
				carbs: Utils.sumArrayValues(this.computedItems.map(item => item.macros.carbs.value)),
			};
		},
		summaryPercentages () {
			const divider = this.summaryValues.protein + this.summaryValues.fat + this.summaryValues.carbs;
			return {
				protein: (this.summaryValues.protein / divider * 100) || 0,
				fat: (this.summaryValues.fat / divider * 100) || 0,
				carbs: (this.summaryValues.carbs / divider * 100) || 0,
			};
		},
	},
	data () {
		return {
			items: this.value,
		};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';

.CalculatorTable {
	@_summaryBgColor: @colors_light3;
	@_summaryBorderColor: darken(@colors_light3, 5%);

	&_summaryRow {
		font-weight: 500;
		font-size: 1.2rem;
		background-color: @_summaryBgColor !important;

		td {
			border-color: @_summaryBorderColor;
		}

		&-percent {
			font-size: 1rem;
		}
	}

	&_serving {
		display: flex;
		align-items: center;
	}

	&_servingInput {
		margin-right: .25rem;
		max-width: 5rem;
	}
}
</style>
