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
			autoLoad
			v-model="food"
			@select="onFoodSelect($event)"
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
			food: [],
			modalSubject: undefined,
		};
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
