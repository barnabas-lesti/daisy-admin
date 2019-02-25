<template>
	<div class="CalculatorFoodSelector">
		<SearchInput
			autoSearch
			class="CalculatorFoodSelector_search"
			placeholder="Search for food"
			:initialValue="searchString"
			@search="onSearch($event)"
		/>

		<Loader
			v-if="isLoading"
			dark
			class="CalculatorFoodSelector_loader"
		/>

		<div
			v-if="!isLoading"
			class="CalculatorFoodSelector_content"
		>
			<table
				v-if="items && items.length > 0"
				class="table is-fullwidth is-hoverable is-bordered"
			>
				<tbody>
					<tr
						v-for="item of computedItems"
						:key="item.id"
						@click="onTableRowClick(item)"
					>
						<td class="CalculatorFoodSelector_nameTd">
							<span>{{ item.name }}</span>
							<Icon
								class="CalculatorFoodSelector_arrow"
								type="arrow-double-left"
							/>
						</td>
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
import Utils from '../../common/Utils';
import foodService from '../../services/foodService';

import Icon from '../common/Icon';
import Loader from '../common/Loader';
import SearchInput from '../common/SearchInput';

const DEFAULT_MAX_NUMBER_OF_ITEMS = 20;

export default {
	name: 'CalculatorFoodSelector',
	components: {
		Icon,
		Loader,
		SearchInput,
	},
	props: {
		autoLoad: Boolean,
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
		emitSelect (selectedFood) {
			this.$emit('select', { selectedFood: Utils.cloneDeep(selectedFood) });
		},
		emitSearch (searchString) {
			this.$emit('search', { searchString });
		},
		emitError (error) {
			this.$emit('error', { error });
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
@import (reference) '../../styles/mixins';

.CalculatorFoodSelector {
	&_search {
		margin-bottom: 1rem;
	}

	&_loader {
		margin-top: 2rem;
	}

	&_nameTd {
		position: relative;
		padding-left: 2rem !important;

		&:hover {
			.CalculatorFoodSelector_arrow {
				opacity: .8;
			}
		}
	}

	&_arrow {
		.transition(opacity);
		position: absolute;
		top: 50%;
		left: .5rem;
		transform: translateY(-50%);
		opacity: .1;
	}
}
</style>
