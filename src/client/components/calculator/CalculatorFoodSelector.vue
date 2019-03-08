<template>
	<div class="CalculatorFoodSelector">
		<div class="field">
			<SearchInput
				placeholder="Search for food"
				:initialValue="searchString"
				@search="onSearch($event)"
			/>
		</div>

		<div class="CalculatorFoodSelector_searchResults field">
			<Loader
				v-if="isLoading"
				dark
			/>

			<div v-else>
				<p v-if="loadOccurred && food.length === 0">
					No food found.
				</p>

				<div
					v-else
					class="table table-fullWidth table-hoverable table-bordered"
				>
					<div class="table_body">
						<div
							v-for="(item, index) of food"
							class="table_row"
							:key="index"
							@click="onTableRowClick(item)"
						>
							<div class="table_cell">
								<div>
									<span>{{ item.name }}</span>
									<span class="CalculatorFoodSelector_foodCalories">{{ item.nutrients.calories.value }} kcal</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import Utils from '../../common/Utils';
import logger from '../../common/logger';
import foodService from '../../services/foodService';
import notificationService from '../../services/notificationService';

import Loader from '../common/Loader';
import SearchInput from '../common/SearchInput';

export default {
	name: 'CalculatorFoodSelector',
	components: {
		Loader,
		SearchInput,
	},
	props: {
		autoLoad: Boolean,
	},
	methods: {
		loadFood () {
			this.isLoading = true;
			foodService.getMany({ searchString: this.searchString })
				.then(food => this.food = food)
				.catch(error => {
					logger.error(error);
					notificationService.error('Sorry, but an error occured.');
				})
				.finally(() => {
					this.isLoading = false;
					this.loadOccurred = true;
				});
		},

		onTableRowClick (item) {
			this.emitSelect(item);
		},
		onSearch ({ searchString }) {
			this.searchString = searchString;
			this.loadFood();
		},

		emitSelect (selectedFood) {
			this.$emit('select', { selectedFood: Utils.cloneDeep(selectedFood) });
		},
	},
	created () {
		if (this.autoLoad) {
			this.loadFood();
		}
	},
	data () {
		return {
			food: [],
			searchString: '',
			isLoading: false,
			loadOccurred: false,
		};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/mixins.less';
@import (reference) '../../styles/variables.less';

.CalculatorFoodSelector {
	&_foodCalories {
		float: right;
	}

	&_searchResults {
		height: 10rem;
		overflow-y: auto;
	}
}
</style>
