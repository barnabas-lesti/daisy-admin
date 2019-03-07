<template>
	<div class="CalculatorFoodSelector">
		<div class="field">
			<SearchInput
				placeholder="Search for food"
				:initialValue="searchString"
				@search="onSearch($event)"
			/>
		</div>

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
						<div
							class="CalculatorFoodSelector_nameCell table_cell">
							<span>{{ item.name }}</span>
							<Icon
								class="CalculatorFoodSelector_arrow"
								type="arrowDoubleLeft"
							/>
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

import Icon from '../common/Icon';
import Loader from '../common/Loader';
import SearchInput from '../common/SearchInput';

export default {
	name: 'CalculatorFoodSelector',
	components: {
		Icon,
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
	&_arrow {
		display: none;
	}

	@media screen and (min-width: @breakpoint_tabletMinWidth) {
		&_nameCell {
			position: relative;
			padding-left: 2rem;

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
			display: block;
		}
	}
}
</style>
