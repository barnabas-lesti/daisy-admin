<template>
	<div class="FoodSingleView view">
		<h1>{{ food.name || 'New Food' }}</h1>

		<LoadingOverlay
			v-if="isLoading"
			light
		/>

		<div class="view_section">
			<button
				class="view_action button button-primary"
				@click="onSaveButtonClick()"
			>
				Save food
			</button>
			<button
				v-if="food._id"
				class="view_action button button-danger"
				@click="onDeleteButtonClick()"
			>
				Delete food
			</button>
		</div>

		<div class="view_section">
			<Input
					v-model="food.name"
					label="Name"
					type="text"
				/>
				<div class="columns">
					<div class="columns_column">
						<Input
							v-model="food.serving.value"
							label="Serving"
						/>
					</div>
					<div class="columns_column">
						<Input
							v-model="food.serving.unit"
							label="Unit"
							type="select"
						/>
					</div>
				</div>
				<Input
					v-model="food.calories.value"
					label="Calories"
					postfix="kcal"
				/>
				<Input
					v-model="food.macros.protein.value"
					label="Protein"
					postfix="g"
				/>
				<Input
					v-model="food.macros.fat.value"
					label="Fat"
					postfix="g"
				/>
				<Input
					v-model="food.macros.carbs.value"
					label="Carbs"
					postfix="g"
				/>
		</div>
	</div>
</template>

<script>
import logger from '../../common/logger';
import Food from '../../models/Food';
import foodService from '../../services/foodService';
import notificationService from '../../services/notificationService';

import LoadingOverlay from '../common/LoadingOverlay';
import Input from '../common/Input';

export default {
	name: 'RecipesSingleView',
	components: {
		LoadingOverlay,
		Input,
	},
	methods: {
		onSaveButtonClick () {
			this.saveFood();
		},
		onDeleteButtonClick () {
			this.deleteFood();
		},

		saveFood () {
			this.isLoading = true;
			const operationPromise = this.food._id
				? foodService.update(this.food._id, this.food) : foodService.save(this.food);
			operationPromise
				.then(food => {
					if (!this.food._id) {
						this.food = food;
						this.$router.push({
							name: 'foodEdit',
							params: {
								_id: food._id,
								food,
							},
						});
					}
					notificationService.success('Food successfully saved.');
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('Sorry, but an error occured.');
				})
				.finally(() => this.isLoading = false);
		},
		deleteFood () {
			this.isLoading = true;
			foodService.delete(this.food._id)
				.then(() => {
					this.$router.push({ name: 'food' });
					notificationService.success('Food successfully deleted.');
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('Sorry, but an error occured.');
					this.isLoading = false;
				});
		},
		loadFood (_id) {
			this.isLoading = true;
			foodService.getOne(_id)
				.then(food => {
					this.food = food;
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('Sorry, but an error occured.');
				})
				.finally(() => this.isLoading = false);
		},
	},
	data () {
		return {
			food: new Food(),
			isLoading: false,
		};
	},
	created () {
		const {
			_id,
			food,
		} = this.$route.params;
		if (food) {
			this.food = food;
		} else if (_id) {
			this.loadFood(_id);
		}
	},
};
</script>
