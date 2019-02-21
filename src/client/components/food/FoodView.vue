<template>
	<div class="FoodView">
		<h1>Food</h1>

		<div class="FoodView_controls">
			<div class="field">
				<SearchInput
					autoSearch
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

		<Loader
			v-if="foodLoadingInProgress"
			dark
		/>

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

import Loader from '../common/Loader';
import SearchInput from '../common/SearchInput';
import FoodTable from './FoodTable';
import FoodModal from './FoodModal';

export default {
	components: {
		Loader,
		SearchInput,
		FoodTable,
		FoodModal,
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
					console.warn(error);
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
			food: undefined,
			modalSubject: undefined,
		};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/partials';

.FoodView {
	&:extend(.page all);

	&_controls {
		margin-bottom: 1rem;
	}
}
</style>
