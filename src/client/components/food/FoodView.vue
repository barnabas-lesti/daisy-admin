<template>
	<div class="FoodView">
		<h1>Food</h1>

		<div class="FoodView_description">
			<p>On this page you can <b>create/modify/delete</b> food.</p>
			<p>To create a new item simply click on the <b>New button</b>. A <b>modal</b> will pop up where you can enter the information about the food.</p>
			<p>
				If you want to <b>modify or delete</b> an existing item, simply <b>click on the food</b>, the same modal will pop up that was used
				to create a new item.
			</p>
			<p>Edit the fields and/or <b>click on the appropriate button</b> to save or delete the item.</p>
		</div>

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
import storageService, { StorageKeys } from '../../services/storageService';

import FoodTable from './FoodTable';
import FoodModal from './FoodModal';

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
			if (initialValue._id) {
				this.food = this.food.map(item => item._id === initialValue._id ? subject : item);
			} else {
				this.food.push(subject);
			}
		},
		onModalDelete ({ _id }) {
			this.food = this.food.filter(item => item._id !== _id);
		},
	},
	watch: {
		food (newValue) {
			storageService.saveToLocalStorage(StorageKeys.foodView.FOOD_MODEL, newValue);
		},
		searchString (newValue) {
			storageService.saveToLocalStorage(StorageKeys.foodView.SEARCH_STRING, newValue);
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
		this.food = storageService.fetchFromLocalStorage(StorageKeys.foodView.FOOD_MODEL);
		this.searchString = storageService.fetchFromLocalStorage(StorageKeys.foodView.SEARCH_STRING);
		this.loadFood = !this.food;
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/partials';

.FoodView {
	&:extend(.page all);

	&_description {
		margin-bottom: 1.5rem;
		font-size: .9em;
	}

	&_actions {
		margin-bottom: 1rem;
	}
}
</style>
