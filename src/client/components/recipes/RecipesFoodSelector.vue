<template>
	<div class="RecipesFoodSelector">
		<SearchInput
			class="RecipesFoodSelector_search"
			autoSearch
			@search="onSearch($event)"
		/>

		<Loader
			v-if="isLoading"
			dark
		/>

		<table
			v-if="food && food.length > 0"
			class="table is-hoverable is-fullwidth is-bordered"
		>
			<tbody>
				<tr
					v-for="foodItem in food.slice(0, maxItemCount)"
					:key="foodItem.id"
					@click="onFoodItemClick(foodItem)"
					:class="[
						'RecipesFoodSelector_foodItem',
						{ 'RecipesFoodSelector_foodItem-selected': lastSelectedFoodItem && lastSelectedFoodItem.id === foodItem.id },
					]"
				>
					<td>{{ foodItem.name }}</td>
				</tr>
			</tbody>
		</table>

		<p v-if="food && food.length > maxItemCount">
			More than {{ maxItemCount }} items were found, {{ food.length - maxItemCount }} items are not visible.
		</p>

		<p v-if="food && food.length === 0">
			No items found.
		</p>
	</div>
</template>

<script>
import foodService from '../../services/foodService';
import Utils from '../../Utils';

import Loader from '../common/Loader';
import SearchInput from '../common/SearchInput';

const SELECTION_FADE_TIMEOUT = 1000;
const MAX_ITEM_COUNT = 10;

export default {
	name: 'RecipesFoodSelector',
	components: {
		Loader,
		SearchInput,
	},
	methods: {
		emitSelect (selectedItem) {
			this.$emit('select', { selectedItem: Utils.cloneDeep(selectedItem) });
		},
		emitError (error) {
			this.$emit('error', { error });
		},

		onSearch ({ searchString }) {
			this.loadFood(searchString);
		},
		onFoodItemClick (foodItem) {
			this.selectItem(foodItem);
			this.emitSelect(foodItem);
		},

		loadFood (searchString = '') {
			this.isLoading = true;
			this.food = undefined;
			foodService.getMany({ searchString })
				.then(food => this.food = food)
				.catch(error => this.emitError(error))
				.finally(() => this.isLoading = false);
		},
		selectItem (foodItem) {
			this.lastSelectedFoodItem = foodItem;
			if (this.selectionFadeTimeoutId) {
				window.clearTimeout(this.selectionFadeTimeoutId);
			}
			this.selectionFadeTimeoutId = window.setTimeout(() => {
				this.lastSelectedFoodItem = undefined;
			}, SELECTION_FADE_TIMEOUT);
		},
	},
	props: {},
	created () {
		this.loadFood();
	},
	data () {
		return {
			isLoading: false,
			selectionFadeTimeoutId: undefined,
			food: undefined,
			lastSelectedFoodItem: undefined,
			maxItemCount: MAX_ITEM_COUNT,
		};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/mixins';
@import (reference) '../../styles/variables';

.RecipesFoodSelector {
	@_foodItemBgColor-selected: @colors_light1;

	&_search {
		margin-bottom: 1rem;
	}

	&_foodItem {
		&-selected {
			background-color: @_foodItemBgColor-selected !important;
		}
	}
}
</style>
