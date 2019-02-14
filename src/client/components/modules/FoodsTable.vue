<template>
	<table class="FoodsTable table is-fullwidth">
		<thead>
			<tr>
				<th>Name</th>
				<th>Amount</th>
				<th>Calories</th>
				<th>Protein</th>
				<th>Fat</th>
				<th>Carbs</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="(item, index) in items"
				:key="index"
				:class="[
					'_row',
					{ '_row-editMode': item.editMode },
				]"
			>
				<td>
					<span class="_value">{{ item.name }}</span>
					<input
						:value="item.name"
						class="_input _input-name input"
						type="text"
					/>
				</td>
				<td>
					<div class="_tdContent">
						<span class="_value">{{ item.serving }} {{ item.servingUnit }}</span>
						<input
							:value="item.serving"
							class="_input _input-serving input"
							type="number"
						/>
						<div class="_input _input-servingUnit select">
							<select :value="item.servingUnit">
								<option value="g">g</option>
								<option value="ml">ml</option>
							</select>
						</div>
					</div>
				</td>
				<td>
					<div class="_tdContent">
						<span class="_value">{{ item.calories }}</span>
						<input
							:value="item.calories"
							class="_input input"
							type="number"
						/>
						<span class="_unit">kcal</span>
					</div>
				</td>
				<td>
					<div class="_tdContent">
						<span class="_value">{{ item.protein }}</span>
						<input
							:value="item.protein"
							class="_input input"
							type="number"
						/>
						<span class="_unit">g</span>
					</div>
				</td>
				<td>
					<div class="_tdContent">
						<span class="_value">{{ item.fat }}</span>
						<input
							:value="item.fat"
							class="_input input"
							type="number"
						/>
						<span class="_unit">g</span>
					</div>
				</td>
				<td>
					<div class="_tdContent">
						<span class="_value">{{ item.carbs }}</span>
						<input
							:value="item.carbs"
							class="_input input"
							type="number"
						/>
						<span class="_unit">g</span>
					</div>
				</td>
				<td>
					<div class="_tdContent _tdContent-controls">
						<span
							@click="enableEdit(index)"
							class="_control"
						>
							<Icon type="edit" />
						</span>
						<span
							class="_control"
						>
							<Icon type="delete" />
						</span>
						<span
							class="_control"
						>
							<Icon type="save" />
						</span>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import Icon from './Icon.vue';

export default {
	name: 'FoodsTable',
	components: {
		Icon,
	},
	methods: {
		enableEdit (itemIndex) {
			this.items = this.items.map((item, index) => {
				if (index === itemIndex) {
					item.editMode = !item.editMode;
				} else {
					item.editMode = false;
				}
				return item;
			});
		},
	},
	props: {
		initialItems: {
			required: true,
			type: Array,
			validator: items => {
				for (const item of items) {
					if (!item.name) {
						return false;
					}
				}
				return true;
			},
		},
	},
	watch: {
		initialItems (update) {
			this.items = update;
		},
	},
	data () {
		return {
			items: this.initialItems,
		};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/mixins';

.FoodsTable {
	._control {
		.transition(opacity);
		margin-right: .5rem;
		opacity: .8;

		&:last-of-type {
			margin-right: 0;
		}

		&:hover {
			opacity: 1;
		}
	}

	._row {
		.transition(background-color);
		background-color: #ffffff;

		td {
			vertical-align: middle;
		}

		&:hover,
		&-editMode {
			cursor: pointer;
			background-color: #eeeeee;

			._tdContent-controls {
				opacity: 1;
			}
		}

		&-editMode {
			._value {
				display: none;
			}

			._input {
				display: inline-block;
			}
		}
	}

	._input {
		width: 6rem;
		display: none;

		&-name {
			width: auto;
		}

		&-serving {
			margin-right: .25rem;
		}

		&-servingUnit {
			width: auto;
		}
	}

	._value {
		display: inline-block;
	}

	._unit {
		display: inline-block;
		margin-left: .25rem;
	}

	._tdContent {
		align-items: center;
		display: flex;
		justify-content: flex-end;

		&-controls {
			.transition(opacity);
			font-size: 0;
			justify-content: flex-end;
			opacity: 0;
		}
	}
}
</style>
