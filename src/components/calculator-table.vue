<template lang="pug">
	.calculator-table
		v-data-table.elevation-1(v-if='items && items.length', :value='value', :items='items', :headers='headers',
			item-key='_id', hide-actions, @input='onInput')
			template(v-slot:items='props')
				tr(:class="props.selected ? 'blue lighten-4': ''", :active='props.selected', @click='props.selected = !props.selected')
					td(style='width: 50px;')
						v-icon(v-if="props.item.type === 'food'", small) fastfood
						v-icon(v-if="props.item.type === 'recipe'", small) book
						v-icon(v-if="props.item.type === 'exercise'", small) directions_run
					td.pl-1
						div.font-weight-bold.text-truncate(style='width: 150px;') {{ props.item.content.name }}
					td.text-xs-right
						v-text-field.my-2.py-0(v-model='props.item.serving.value', :suffix="$tc(`common.units.${props.item.serving.unit}`, props.item.serving.value)",
							type='number', style='font-size: 14px; max-width: 80px;', hide-details, @click.stop)
					td.text-xs-right
						div(v-if='props.item.nutrients.calories.servingMultiplier', style='width: 65px')
							| {{ props.item.nutrients.calories.servingMultiplier * props.item.serving.value | twoDecimal }} {{ $t('common.units.kcal') }}
					td.text-xs-right
						div(v-if='props.item.nutrients.carbs.servingMultiplier', style='width: 55px')
							| {{ props.item.nutrients.carbs.servingMultiplier * props.item.serving.value | twoDecimal }} {{ $t('common.units.g') }}
					td.text-xs-right
						div(v-if='props.item.nutrients.protein.servingMultiplier', style='width: 55px')
							| {{ props.item.nutrients.protein.servingMultiplier * props.item.serving.value | twoDecimal }} {{ $t('common.units.g') }}
					td.text-xs-right
						div(v-if='props.item.nutrients.fat.servingMultiplier', style='width: 55px')
							| {{ props.item.nutrients.fat.servingMultiplier * props.item.serving.value | twoDecimal }} {{ $t('common.units.g') }}
		v-card.pa-4.text-xs-center(v-else)
			slot(name='noData') {{ $t('components.calculatorTable.noDataFallback') }}
</template>

<script>
export default {
	name: 'CalculatorTable',
	props: {
		items: {
			type: Array,
			default: () => [],
		},
		value: {
			type: Array,
			default: () => [],
		},
	},
	data () {
		return {
			headers: [
				{ text: '', value: 'type', align: 'left' },
				{ text: this.$t('common.name'), value: 'content.name', align: 'left', class: 'pl-1' },
				{ text: this.$t('common.serving'), value: 'serving.value', align: 'right' },
				{ text: this.$t('common.nutrients.calories'), value: 'nutrients.calories.value', align: 'right' },
				{ text: this.$t('common.nutrients.carbs'), value: 'nutrients.carbs.value', align: 'right' },
				{ text: this.$t('common.nutrients.protein'), value: 'nutrients.protein.value', align: 'right' },
				{ text: this.$t('common.nutrients.fat'), value: 'nutrients.fat.value', align: 'right' },
			],
		};
	},
	methods: {
		onInput (selection) {
			this.$emit('input', selection);
		},
	},
};
</script>
