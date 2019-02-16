<template>
	<div class="FoodView">
		<h1>Food</h1>
		<div
			v-if="errorOccured"
			class="_errorMessage"
		>
			Sorry, an unknown error occured. Please try again.
		</div>

		<div class="_controls">
			<div class="field">
				<FoodSearch
					:initialValue="searchString"
					:disabled="foodLoadingInProgress"
					@search="onSearch($event)"
				/>
			</div>
			<div class="field">
				<button
					class="button is-primary"
					@click="onNewButtonClick()"
				>
					New
				</button>
			</div>
		</div>

		<FoodTable
			v-if="food"
			:initialItems="food"
			@select="onFoodSelect($event)"
		/>
		<div
			v-if="foodLoadingInProgress"
			class="_loaderContainer"
		>
			<Spinner class="_loader" />
		</div>
		<FoodModal
			v-if="modalSubject"
			:initialItem="modalSubject"
			:isLoading="foodChangeInProgress"
			@close="onModalClose()"
			@save="onModalSave($event)"
			@delete="onModalDelete($event)"
		/>
	</div>
</template>

<script>
import foodService from '../../services/foodService';
import Food from '../../models/Food';

import Spinner from '../common/Spinner';
import FoodTable from './FoodTable';
import FoodModal from './FoodModal';
import FoodSearch from './FoodSearch';

const ERROR_DISPLAY_DURATION = 3000;

export default {
	components: {
		Spinner,
		FoodTable,
		FoodModal,
		FoodSearch,
	},
	methods: {
		loadFood (searchString = '') {
			this.foodLoadingInProgress = true;
			this.food = undefined;
			foodService.getMany({ searchString })
				.then(food => {
					this.food = food;
				})
				.catch(error => {
					this.showError(error);
				})
				.finally(() => {
					this.foodLoadingInProgress = false;
				});
		},
		closeModal () {
			this.modalSubject = undefined;
		},
		showModal (subject) {
			this.modalSubject = subject;
		},
		showError (error) {
			console.warn(error);
			this.errorOccured = true;

			if (this.errorTimeoutId) {
				clearTimeout(this.errorTimeoutId);
			}
			this.errorTimeoutId = window.setTimeout(() => {
				this.errorOccured = false;
			}, ERROR_DISPLAY_DURATION);
		},

		onNewButtonClick () {
			this.showModal(new Food());
		},
		onFoodSelect ({ item }) {
			this.showModal(item);
		},
		onModalClose () {
			this.closeModal();
		},
		onModalSave ({ initialItem, updatedItem }) {
			this.foodChangeInProgress = true;
			const operationPromise = initialItem.id ? foodService.update(initialItem.id, updatedItem) : foodService.save(updatedItem);
			operationPromise
				.then(() => {
					this.loadFood();
				})
				.catch(error => {
					this.showError(error);
				})
				.finally(() => {
					this.closeModal();
					this.foodChangeInProgress = false;
				});
		},
		onModalDelete ({ id }) {
			this.foodChangeInProgress = true;
			foodService.delete(id)
				.then(() => {
					this.loadFood();
				})
				.catch(error => {
					this.showError(error);
				})
				.finally(() => {
					this.closeModal();
					this.foodChangeInProgress = false;
				});
		},
		onSearch ({ searchString }) {
			this.loadFood(searchString);
		},
	},
	created () {
		this.loadFood();
	},
	data () {
		return {
			foodChangeInProgress: false,
			foodLoadingInProgress: false,
			errorOccured: false,
			food: undefined,
			modalSubject: undefined,
			searchString: undefined,
		};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/partials';
@import (reference) '../../styles/variables';

.FoodView {
	&:extend(.page all);

	._controls {
		margin-bottom: 1rem;
	}

	._loaderContainer {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	._loader {
		font-size: 3rem;

		&::after {
			border-color: @colors_dark1;
		}
	}

	._errorMessage {
		color: @colors_danger0;
	}
}
</style>
