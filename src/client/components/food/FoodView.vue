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
			:autoLoad="!food || food.length === 0"
			:searchString="searchString"
			@select="onFoodSelect($event)"
			@search="onFoodSearch($event)"
		/>

		<FoodModal
			v-if="modalSubject"
			:value="modalSubject"
			@close="onModalClose()"
			@save="onModalSave($event)"
			@delete="onModalDelete($event)"
		/>
	</div>
</template>

<script>
import Food from '../../models/Food';

import { MutationTypes } from '../../store';

import FoodTable from './FoodTable';
import FoodModal from './FoodModal';

export default {
	components: {
		FoodTable,
		FoodModal,
	},
	methods: {
		openModal (modalSubject = new Food()) {
			this.$store.commit(MutationTypes.foodView.SHOW_MODAL, modalSubject);
		},
		closeModal () {
			this.$store.commit(MutationTypes.foodView.HIDE_MODAL);
		},

		onNewButtonClick () {
			this.openModal();
		},
		onFoodSelect ({ selectedFood }) {
			this.openModal(selectedFood);
		},
		onModalClose () {
			this.closeModal();
		},
		onFoodSearch ({ searchString }) {
			this.$store.commit(MutationTypes.foodView.SET_SEARCH_STRING, searchString);
		},
		onModalSave ({ initialValue, subject }) {
			if (initialValue._id) {
				this.$store.commit(MutationTypes.foodView.UPDATE_ITEM_IN_FOOD, subject);
			} else {
				this.$store.commit(MutationTypes.foodView.ADD_FOOD, subject);
			}
		},
		onModalDelete ({ _id }) {
			this.$store.commit(MutationTypes.foodView.REMOVE_FOOD, _id);
		},
	},
	computed: {
		food: {
			get () {
				return this.$store.state.foodView.food;
			},
			set (value) {
				this.$store.commit(MutationTypes.foodView.SET_FOOD, value);
			},
		},
		searchString () {
			return this.$store.state.foodView.searchString;
		},
		modalSubject () {
			return this.$store.state.foodView.modalSubject;
		},
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
