<template>
	<div class="FoodSingleView view">
		<h1>{{ food.name || $t('food.view.newFoodDefaultTitle') }}</h1>

		<LoadingOverlay
			v-if="isLoading"
			light
		/>

		<div class="view_section">
			<button
				class="view_action button button-primary"
				@click="onSaveButtonClick()"
			>
				{{ $t('food.view.saveButton') }}
			</button>
			<button
				v-if="food._id"
				class="view_action button button-danger"
				@click="onDeleteButtonClick()"
			>
				{{ $t('food.view.deleteButton') }}
			</button>
		</div>

		<div class="view_section">
			<Input
				v-model="food.name"
				type="text"
				:label="$t('food.view.form.name')"
			/>
			<div class="columns">
				<div class="columns_column">
					<Input
						v-model="food.serving.value"
						notField
						:label="$t('food.view.form.serving')"
					/>
				</div>
				<div class="columns_column">
					<Input
						v-model="food.serving.unit"
						notField
						type="select"
						:label="$t('food.view.form.unit')"
					/>
				</div>
			</div>
		</div>

		<hr />

		<div class="view_section">
			<Input
				v-model="food.nutrients.calories.value"
				:label="$t('food.view.form.calories')"
				:postfix="$t('common.units.calories')"
			/>
			<Input
				v-model="food.nutrients.carbs.value"
				:label="$t('food.view.form.carbs')"
				:postfix="$t('common.units.grams')"
			/>
			<Input
				v-model="food.nutrients.protein.value"
				:label="$t('food.view.form.protein')"
				:postfix="$t('common.units.grams')"
			/>
			<Input
				v-model="food.nutrients.fat.value"
				:label="$t('food.view.form.fat')"
				:postfix="$t('common.units.grams')"
			/>
		</div>

		<hr />

		<div class="view_section">
			<Input
				v-model="food.nutrients.energy.value"
				:label="$t('food.view.form.energy')"
				:postfix="$t('common.units.energy')"
			/>
			<Input
				v-model="food.nutrients.saturatedFat.value"
				:label="$t('food.view.form.saturatedFat')"
				:postfix="$t('common.units.grams')"
			/>
			<Input
				v-model="food.nutrients.sugar.value"
				:label="$t('food.view.form.sugar')"
				:postfix="$t('common.units.grams')"
			/>
			<Input
				v-model="food.nutrients.fiber.value"
				:label="$t('food.view.form.fiber')"
				:postfix="$t('common.units.grams')"
			/>
			<Input
				v-model="food.nutrients.salt.value"
				:label="$t('food.view.form.salt')"
				:postfix="$t('common.units.grams')"
			/>
		</div>

		<hr />

		<div class="view_section">
			<Input
				v-model="food.description"
				type="textarea"
				:label="$t('food.view.form.description')"
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
					notificationService.success('food.view.notifications.saved');
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('common.notifications.unknownErrorOccurred');
				})
				.finally(() => this.isLoading = false);
		},
		deleteFood () {
			this.isLoading = true;
			foodService.delete(this.food._id)
				.then(() => {
					this.$router.push({ name: 'food' });
					notificationService.success('food.view.notifications.deleted');
				})
				.catch(error => {
					logger.error(error);
					notificationService.error('common.notifications.unknownErrorOccurred');
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
					notificationService.error('common.notifications.unknownErrorOccurred');
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
