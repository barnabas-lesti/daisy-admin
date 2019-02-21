<template>
	<div class="RecipesTable">
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
				<tr class="RecipesTable_summaryRow">
					<td>Summary</td>
					<td></td>
					<td>{{ summaryValues.calories }} kcal</td>
					<td>{{ summaryValues.protein }} g</td>
					<td>{{ summaryValues.fat }} g</td>
					<td>{{ summaryValues.carbs }} g</td>
				</tr>
				<tr class="RecipesTable_summaryRow RecipesTable_summaryRow-percent">
					<td></td>
					<td></td>
					<td></td>
					<td>{{ summaryPercentages.protein }} %</td>
					<td>{{ summaryPercentages.fat }} %</td>
					<td>{{ summaryPercentages.carbs }} %</td>
				</tr>
				<tr
					v-for="(item, index) in initialItems"
					:key="index"
				>
					<td>{{ item.name }}</td>
					<td>
						<div class="RecipesTable_serving">
							<input
								class="RecipesTable_servingInput input"
								type="number"
								v-model="item.serving.value"
							/>
							<span>{{ item.serving.unit }}</span>
						</div>
					</td>
					<td>{{ computedItems[index].macros.calories.value }} kcal</td>
					<td>{{ computedItems[index].macros.protein.value }} g</td>
					<td>{{ computedItems[index].macros.fat.value }} g</td>
					<td>{{ computedItems[index].macros.carbs.value }} g</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import Utils from '../../Utils';

export default {
	name: 'RecipesTable',
	methods: {
		calculateMacroValue: (macro, serving) => Utils.round(macro.servingMultiplier * serving.value, 2),
	},
	props: {
		initialItems: {
			default: () => [],
			type: Array,
		},
	},
	computed: {
		computedItems () {
			return this.initialItems.map(item => {
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
				protein: Utils.round(this.summaryValues.protein / divider * 100) || 0,
				fat: Utils.round(this.summaryValues.fat / divider * 100) || 0,
				carbs: Utils.round(this.summaryValues.carbs / divider * 100) || 0,
			};
		},
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';

.RecipesTable {
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
