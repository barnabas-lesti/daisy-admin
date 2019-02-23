<template>
	<div class="FoodModal modal is-active">
		<div
			class="modal-background"
			@click="close()"
		></div>
		<div class="modal-card">
			<LoadingOverlay v-if="isLoading" />
			<header class="modal-card-head">
				<p class="modal-card-title">Edit food</p>
				<button
					class="delete"
					@click="close()"
				></button>
			</header>

			<section class="modal-card-body">
				<FoodModalInput
					v-model="subject.name"
					label="Name"
					type="text"
				/>
				<div class="columns">
					<div class="column">
						<FoodModalInput
							v-model="subject.serving.value"
							label="Serving"
						/>
					</div>
					<div class="column">
						<FoodModalInput
							v-model="subject.serving.unit"
							label="Unit"
							type="select"
						/>
					</div>
				</div>
				<FoodModalInput
					v-model="subject.macros.calories.value"
					label="Calories"
					postfix="kcal"
				/>
				<FoodModalInput
					v-model="subject.macros.protein.value"
					label="Protein"
					postfix="g"
				/>
				<FoodModalInput
					v-model="subject.macros.fat.value"
					label="Fat"
					postfix="g"
				/>
				<FoodModalInput
					v-model="subject.macros.carbs.value"
					label="Carbs"
					postfix="g"
				/>
			</section>

			<footer class="modal-card-foot">
				<button
					class="button is-success"
					@click="saveItem()"
				>
					Save changes
				</button>
				<button
					class="button"
					@click="close()"
				>
					Cancel
				</button>
				<button
					class="button is-danger"
					@click="deleteItem()"
					:disabled="!subject.id"
				>
					Delete
				</button>
			</footer>
		</div>
	</div>
</template>

<script>
import Utils from '../../Utils';
import foodService from '../../services/foodService';

import LoadingOverlay from '../common/LoadingOverlay';
import FoodModalInput from './FoodModalInput';

export default {
	name: 'FoodModal',
	components: {
		LoadingOverlay,
		FoodModalInput,
	},
	methods: {
		close () {
			this.emitClose();
		},
		deleteItem () {
			this.isLoading = true;
			foodService.delete(this.subject.id)
				.then(() => this.emitDelete(this.subject.id))
				.catch(error => this.emitError(error))
				.finally(() => {
					this.isLoading = false;
					this.close();
				});
		},
		saveItem () {
			this.isLoading = true;
			const operationPromise = this.initialValue.id ? foodService.update(this.initialValue.id, this.subject) : foodService.save(this.subject);
			operationPromise
				.then(food => {
					this.subject = this.subject.id ? this.subject : food;
					this.emitSave();
				})
				.catch(error => this.emitError(error))
				.finally(() => {
					this.isLoading = false;
					this.close();
				});
		},

		emitClose () {
			this.$emit('close');
		},
		emitDelete (id) {
			this.$emit('delete', { id });
		},
		emitSave () {
			const {
				subject,
				initialValue,
			} = this;
			this.$emit('save', {
				subject,
				initialValue,
			});
		},
		emitError (error) {
			this.$emit('error', { error });
		},
	},
	props: {
		initialValue: {
			required: true,
			type: Object,
		},
	},
	data () {
		return {
			subject: Utils.cloneDeep(this.initialValue),
			isLoading: false,
		};
	},
};
</script>
