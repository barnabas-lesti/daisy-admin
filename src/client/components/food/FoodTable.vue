<template>
	<div class="FoodTable">
		<SearchInput
			autoSearch
			class="FoodTable_search"
			:initialValue="searchString"
			:placeholder="searchPlaceholder"
			@search="onSearch($event)"
		/>

		<Loader
			v-if="isLoading"
			dark
			class="FoodTable_loader"
		/>

		<div
			v-if="!isLoading"
			class="FoodTable_content"
		>
			<table
				v-if="items && items.length > 0"
				:class="[
					'table',
					'is-fullwidth',
					'is-hoverable',
					{ 'is-bordered': bordered },
				]"
			>
				<thead v-if="!mini">
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
						v-for="item of computedItems"
						:key="item.id"
						@click="onTableRowClick(item)"
					>
						<td>{{ item.name }}</td>
						<td v-if="!mini">{{ item.serving.value }} {{ item.serving.unit }}</td>
						<td v-if="!mini">{{ item.macros.calories.value }} g</td>
						<td v-if="!mini">{{ item.macros.protein.value }} g</td>
						<td v-if="!mini">{{ item.macros.fat.value }} g</td>
						<td v-if="!mini">{{ item.macros.carbs.value }} g</td>
					</tr>
				</tbody>
			</table>

			<p v-if="items && items.length > maxNumberOfItems">
				More than {{ maxNumberOfItems }} items were found, {{ items.length - maxNumberOfItems }} items are not visible.
			</p>

			<p v-if="loadOccurred && items && items.length === 0">
				No items found.
			</p>
		</div>
	</div>
</template>

<script>
import Utils from '../../Utils';
import foodService from '../../services/foodService';

import Loader from '../common/Loader';
import SearchInput from '../common/SearchInput';

const DEFAULT_MAX_NUMBER_OF_ITEMS = 20;

export default {
	name: 'FoodTable',
	components: {
		Loader,
		SearchInput,
	},
	props: {
		autoLoad: Boolean,
		mini: Boolean,
		bordered: Boolean,
		searchPlaceholder: String,
		searchString: String,
		maxNumberOfItems: {
			default: DEFAULT_MAX_NUMBER_OF_ITEMS,
			type: Number,
		},
		value: {
			default: () => [],
			type: Array,
		},
	},
	methods: {
		loadFood (searchString = '') {
			this.isLoading = true;
			foodService.getMany({ searchString })
				.then(food => this.setFood(food))
				.catch(error => this.emitError(error))
				.finally(() => {
					this.isLoading = false;
					this.loadOccurred = true;
				});
		},
		setFood (food) {
			this.items = food;
			this.emitInput(this.items);
		},

		emitInput (value) {
			this.$emit('input', value);
		},
		emitError (error) {
			this.$emit('error', { error });
		},
		emitSelect (selectedFood) {
			this.$emit('select', { selectedFood: Utils.cloneDeep(selectedFood) });
		},
		emitSearch (searchString) {
			this.$emit('search', { searchString });
		},

		onTableRowClick (item) {
			this.emitSelect(item);
		},
		onSearch ({ searchString }) {
			this.loadFood(searchString);
			this.emitSearch(searchString);
		},
	},
	computed: {
		computedItems () {
			return this.items
				.slice(0)
				.sort((a, b) => {
					const aName = a.name.toLowerCase();
					const bName = b.name.toLowerCase();
					if (aName < bName) return -1;
					if (aName > bName) return 1;
					return 0;
				})
				.slice(0, this.maxNumberOfItems);
		},
	},
	watch: {
		value (newValue) {
			this.setFood(newValue);
		},
	},
	created () {
		if (this.autoLoad) {
			this.loadFood();
		}
	},
	data () {
		return {
			items: this.value,
			isLoading: false,
			loadOccurred: false,
		};
	},
};
</script>

<style lang="less">
.FoodTable {
	&_search {
		margin-bottom: 1rem;
	}

	&_loader {
		margin-top: 2rem;
	}
}
</style>
