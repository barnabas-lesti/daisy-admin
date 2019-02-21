<template>
	<div class="FoodTable">
		<table
			v-if="items && items.length > 0"
			class="table is-fullwidth is-hoverable"
		>
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
				<tr
					v-for="item in items.slice(0, maxNumberOfItems)"
					:key="item.id"
					@click="selectItem(item)"
				>
					<td>{{ item.name }}</td>
					<td>{{ item.serving.value }} {{ item.serving.unit }}</td>
					<td>{{ item.macros.calories.value }} g</td>
					<td>{{ item.macros.protein.value }} g</td>
					<td>{{ item.macros.fat.value }} g</td>
					<td>{{ item.macros.carbs.value }} g</td>
				</tr>
			</tbody>
		</table>

		<p v-if="items && items.length > maxNumberOfItems">
			More than {{ maxNumberOfItems }} items were found, {{ items.length - maxNumberOfItems }} items are not visible.
		</p>

		<p v-if="items && items.length === 0">
			No items found.
		</p>
	</div>
</template>

<script>
const MAX_NUMBER_OF_ITEMS = 20;

export default {
	name: 'FoodTable',
	methods: {
		selectItem (item) {
			this.$emit('select', { item });
		},
	},
	props: {
		initialItems: {
			required: true,
			type: Array,
		},
	},
	data () {
		return {
			items: this.initialItems,
			maxNumberOfItems: MAX_NUMBER_OF_ITEMS,
		};
	},
};
</script>
