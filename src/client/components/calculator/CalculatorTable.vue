<template>
	<div class="CalculatorTable">
		<table class="table is-fullwidth">
			<thead>
				<tr>
					<th v-if="!onlySummary">Name</th>
					<th v-if="!onlySummary">Serving</th>
					<th>Calories</th>
					<th>Protein</th>
					<th>Fat</th>
					<th>Carbs</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-if="!noSummary"
					class="CalculatorTable_tableRow CalculatorTable_tableRow-summary"
				>
					<td v-if="!onlySummary">Summary</td>
					<td v-if="!onlySummary"></td>
					<td>{{ summaryValues.calories.toFixed(0) }} kcal</td>
					<td>{{ summaryValues.protein.toFixed(0) }} g</td>
					<td>{{ summaryValues.fat.toFixed(0) }} g</td>
					<td>{{ summaryValues.carbs.toFixed(0) }} g</td>
					<td></td>
				</tr>
				<tr
					v-if="!noSummary"
					class="CalculatorTable_tableRow CalculatorTable_tableRow-summary CalculatorTable_tableRow-summaryPercent"
				>
					<td v-if="!onlySummary"></td>
					<td v-if="!onlySummary"></td>
					<td></td>
					<td>{{ summaryPercentages.protein.toFixed(0) }} %</td>
					<td>{{ summaryPercentages.fat.toFixed(0) }} %</td>
					<td>{{ summaryPercentages.carbs.toFixed(0) }} %</td>
					<td></td>
				</tr>
				<tr
					v-for="(item, index) in (onlySummary ? [] : sortedItems)"
					class="CalculatorTable_tableRow"
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
					<td>{{ macroCalculatedItems[index].macros.calories.value.toFixed(2) }} kcal</td>
					<td>{{ macroCalculatedItems[index].macros.protein.value.toFixed(2) }} g</td>
					<td>{{ macroCalculatedItems[index].macros.fat.value.toFixed(2) }} g</td>
					<td>{{ macroCalculatedItems[index].macros.carbs.value.toFixed(2) }} g</td>
					<td>
						<div class="CalculatorTable_rowActions">
							<div
								class="CalculatorTable_action"
								@click="onDeleteClick(index)"
							>
								<Icon type="trash" />
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import Utils from '../../Utils';

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
		onlySummary: Boolean,
		noSummary: Boolean,
	},
	methods: {
		calculateMacroValue: (macro, serving) => macro.servingMultiplier * serving.value,
		setItems (items) {
			this.items = items;
			this.emitInput();
		},
		removeItem (toRemoveIndex) {
			this.setItems(this.items.filter((item, index) => index !== toRemoveIndex));
		},

		emitInput () {
			this.$emit('input', this.items);
		},

		onDeleteClick (index) {
			this.removeItem(index);
		},
	},
	computed: {
		sortedItems () {
			return this.items
				.slice(0)
				.sort((a, b) => {
					const aName = a.name.toLowerCase();
					const bName = b.name.toLowerCase();
					if (aName < bName) return -1;
					if (aName > bName) return 1;
					return 0;
				});
		},
		macroCalculatedItems () {
			return this.sortedItems.map(item => {
				item.macros.calories.value = this.calculateMacroValue(item.macros.calories, item.serving);
				item.macros.protein.value = this.calculateMacroValue(item.macros.protein, item.serving);
				item.macros.fat.value = this.calculateMacroValue(item.macros.fat, item.serving);
				item.macros.carbs.value = this.calculateMacroValue(item.macros.carbs, item.serving);
				return item;
			});
		},
		summaryValues () {
			return {
				calories: Utils.sumArrayValues(this.macroCalculatedItems.map(item => item.macros.calories.value)),
				protein: Utils.sumArrayValues(this.macroCalculatedItems.map(item => item.macros.protein.value)),
				fat: Utils.sumArrayValues(this.macroCalculatedItems.map(item => item.macros.fat.value)),
				carbs: Utils.sumArrayValues(this.macroCalculatedItems.map(item => item.macros.carbs.value)),
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
	watch: {
		value (newValue) {
			this.items = newValue;
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
@import (reference) '../../styles/mixins';
@import (reference) '../../styles/variables';

.CalculatorTable {
	@_summaryBgColor: @colors_light3;
	@_summaryBorderColor: darken(@colors_light3, 5%);

	&_tableRow {
		&-summary {
			font-weight: 500;
			font-size: 1.2rem;
			background-color: @_summaryBgColor !important;

			td {
				border-color: @_summaryBorderColor;
			}
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
