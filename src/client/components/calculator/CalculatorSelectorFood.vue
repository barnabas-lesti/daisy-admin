<template>
	<div class="CalculatorSelectorFood">
		<div class="field">
			<SearchInput
				:initialValue="searchString"
				:placeholder="$t('calculator.selector.food.searchPlaceholder')"
				@search="onSearch($event)"
			/>
		</div>

		<div class="CalculatorSelectorFood_searchResult">
			<Loader
				v-if="isLoading"
				dark
			/>

			<p v-else-if="loadOccurred && food.length === 0">
				{{ $t('calculator.selector.food.noItemsFound') }}
			</p>

			<div v-else>
				<div
					v-for="(item, index) of food"
					class="CalculatorSelectorFood_item hoverable"
					:key="index"
					@click="onTableRowClick(item)"
				>
					<span>{{ item.name }}</span>
					<span class="CalculatorSelectorFood_calories">{{ `${item.nutrients.calories.value} ${$t('common.units.calories')}` }}</span>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
// import Utils from '../../common/Utils';
import logger from '../../common/logger';
import Food from '../../models/Food';
import foodService from '../../services/foodService';
import notificationService from '../../services/notificationService';

import Loader from '../common/Loader';
import SearchInput from '../common/SearchInput';

export default {
	name: 'CalculatorSelectorFood',
	components: {
		Loader,
		SearchInput,
	},
	methods: {
		loadFood () {
			this.isLoading = true;
			foodService.getMany({ searchString: this.searchString })
				.then(food => this.food = food)
				.catch(error => {
					logger.error(error);
					notificationService.error('common.notifications.unknownErrorOccurred');
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

		emitSelect (food) {
			this.$emit('select', { food: new Food(food) });
		},
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
.CalculatorSelectorFood {
	&_calories {
		float: right;
	}

	&_item {
		padding: .5rem;
	}

	&_searchResult {
		height: 10rem;
		overflow-y: auto;
	}
}
</style>
