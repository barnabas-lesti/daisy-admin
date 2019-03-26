<template>
	<div class="FoodTable">
		<p v-if="food.length === 0">
			{{ $t('food.table.noFoodFound') }}
		</p>

		<div
			v-else
			class="table table-fullWidth table-hoverable"
		>
			<div class="table_header">
				<div class="table_row">
					<div class="table_cell">{{ $t('food.table.header.name') }}</div>
					<div class="table_cell">{{ $t('food.table.header.serving') }}</div>
					<div class="table_cell">{{ $t('food.table.header.calories') }}</div>
					<div class="table_cell">{{ $t('food.table.header.carbs') }}</div>
					<div class="table_cell">{{ $t('food.table.header.protein') }}</div>
					<div class="table_cell">{{ $t('food.table.header.fat') }}</div>
				</div>
			</div>
			<div class="table_body">
				<router-link
					v-for="(food, index) of food"
					class="table_row"
					:key="index"
					:to="{
						name: 'foodEdit',
						params: {
							_id: food._id,
							food,
						},
					}"
				>
					<div class="table_cell">{{ food.name }}</div>
					<div class="table_cell">{{ food.serving.value }} {{ $tc(`common.units.${food.serving.unit}`, food.serving.value) }}</div>
					<div class="table_cell">{{ food.nutrients.calories.value.toFixed(0) }} {{ $t('common.units.calories') }}</div>
					<div class="table_cell">{{ food.nutrients.carbs.value.toFixed(0) }} {{ $t('common.units.grams') }}</div>
					<div class="table_cell">{{ food.nutrients.protein.value.toFixed(0) }} {{ $t('common.units.grams') }}</div>
					<div class="table_cell">{{ food.nutrients.fat.value.toFixed(0) }} {{ $t('common.units.grams') }}</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FoodTable',
	props: {
		food: {
			default: () => [],
			type: Array,
		},
	},
};
</script>
