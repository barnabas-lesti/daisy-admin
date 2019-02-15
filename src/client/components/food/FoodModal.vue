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
				/>
				<div class="columns">
					<div class="column">
						<FoodModalInput
							v-model="subject.serving.value"
							label="Serving"
							type="number"
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
					v-model="subject.macros.calories"
					label="Calories"
					type="number"
					postfix="kcal"
				/>
				<FoodModalInput
					v-model="subject.macros.protein"
					label="Protein"
					type="number"
					postfix="g"
				/>
				<FoodModalInput
					v-model="subject.macros.fat"
					label="Fat"
					type="number"
					postfix="g"
				/>
				<FoodModalInput
					v-model="subject.macros.carbs"
					label="Carbs"
					type="number"
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
import FoodModalInput from './FoodModalInput';
import LoadingOverlay from '../common/LoadingOverlay';

export default {
	name: 'FoodModal',
	components: {
		LoadingOverlay,
		FoodModalInput,
	},
	methods: {
		saveItem () {
			this.$emit('save', {
				initialItem: this.initialItem,
				updatedItem: this.subject,
			});
		},
		deleteItem () {
			this.$emit('delete', { id: this.initialItem.id });
		},
		close () {
			this.$emit('close');
		},
	},
	props: {
		initialItem: {
			required: true,
			type: Object,
		},
		isLoading: {
			default: false,
			type: Boolean,
		},
	},
	data () {
		return {
			subject: Utils.deepCopyObject(this.initialItem),
		};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';

.FoodModal {

}
</style>
