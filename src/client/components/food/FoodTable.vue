<template>
	<div class="FoodTable">
		<p v-if="food.length === 0">
			No food found.
		</p>

		<div
			v-else
			class="table table-fullWidth table-hoverable"
		>
			<div class="table_header">
				<div class="table_row">
					<div class="table_cell">Name</div>
					<div class="table_cell">Serving</div>
					<div class="table_cell">Calories</div>
					<div class="table_cell">Carbs</div>
					<div class="table_cell">Fat</div>
					<div class="table_cell">Protein</div>
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
					<div class="table_cell">{{ food.serving.value }} {{ food.serving.unit }}</div>
					<div class="table_cell">{{ food.macros.calories.value.toFixed(0) }} kcal</div>
					<div class="table_cell">{{ food.macros.carbs.value.toFixed(0) }} g</div>
					<div class="table_cell">{{ food.macros.fat.value.toFixed(0) }} g</div>
					<div class="table_cell">{{ food.macros.protein.value.toFixed(0) }} g</div>
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
