<template>
	<div class="FoodTable">
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
				<tr
					v-for="item in initialItems"
					:key="item.id"
					@click="selectItem(item)"
				>
					<td>{{ item.name }}</td>
					<td>{{ item.serving.value }} {{ item.serving.unit }}</td>
					<td>{{ item.macros.calories }} g</td>
					<td>{{ item.macros.protein }} g</td>
					<td>{{ item.macros.fat }} g</td>
					<td>{{ item.macros.carbs }} g</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
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
};
</script>

<style lang="less">
@import (reference) '../../styles/mixins';

.FoodTable {
	tbody {
		tr {
			.transition(background-color);
			background-color: #ffffff;

			td {
				vertical-align: middle;
			}

			&:hover {
				cursor: pointer;
				background-color: #eeeeee;
			}
		}
	}
}
</style>
