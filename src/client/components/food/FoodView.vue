<template>
	<div class="FoodView">
		<h1>Food</h1>

		<div class="FoodView_actions">
			<button
				class="button is-primary"
				@click="onNewButtonClick()"
			>
				New
			</button>
		</div>

		<FoodTable
			v-model="food"
			:searchString="searchString"
			:autoLoad="loadFood"
			@select="onFoodSelect($event)"
			@search="onFoodSearch($event)"
		/>

		<FoodModal
			v-if="modalSubject"
			:initialValue="modalSubject"
			@close="onModalClose()"
			@save="onModalSave($event)"
			@delete="onModalDelete($event)"
		/>
	</div>
</template>

<script>
import Food from '../../models/Food';
import storageService from '../../services/storageService';

import FoodTable from './FoodTable';
import FoodModal from './FoodModal';

const FOOD_STORAGE_KEY = 'FoodView.food';
const SEARCH_STRING_STORAGE_KEY = 'FoodView.searchString';

export default {
	components: {
		FoodTable,
		FoodModal,
	},
	methods: {
		openModal (modalSubject = new Food()) {
			this.modalSubject = modalSubject;
		},
		closeModal () {
			this.modalSubject = undefined;
		},

		onNewButtonClick () {
			this.openModal();
		},
		onFoodSelect ({ selectedFood }) {
			this.openModal(selectedFood);
		},
		onFoodSearch ({ searchString }) {
			this.searchString = searchString;
		},
		onModalClose () {
			this.closeModal();
		},
		onModalSave ({ initialValue, subject }) {
			if (initialValue.id) {
				this.food = this.food.map(item => item.id === initialValue.id ? subject : item);
			} else {
				this.food.push(subject);
			}
		},
		onModalDelete ({ id }) {
			this.food = this.food.filter(item => item.id !== id);
		},
	},
	data () {
		return {
			food: undefined,
			searchString: undefined,
			modalSubject: undefined,
			loadFood: undefined,
		};
	},
	created () {
		this.food = storageService.fetchFromLocalStorage(FOOD_STORAGE_KEY);
		this.searchString = storageService.fetchFromLocalStorage(SEARCH_STRING_STORAGE_KEY);
		this.loadFood = !this.food;
	},
	beforeDestroy () {
		storageService.saveToLocalStorage(FOOD_STORAGE_KEY, this.food);
		storageService.saveToLocalStorage(SEARCH_STRING_STORAGE_KEY, this.searchString);
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/partials';

.FoodView {
	&:extend(.page all);

	&_actions {
		margin-bottom: 1rem;
	}
}
</style>
