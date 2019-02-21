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
					label="Name"
					v-model="subject.name"
				/>
				<div class="columns">
					<div class="column">
						<FoodModalInput
							label="Serving"
							type="number"
							v-model="subject.serving.value"
						/>
					</div>
					<div class="column">
						<FoodModalInput
							label="Unit"
							type="select"
							v-model="subject.serving.unit"
						/>
					</div>
				</div>
				<FoodModalInput
					label="Calories"
					type="number"
					postfix="kcal"
					v-model="subject.macros.calories.value"
				/>
				<FoodModalInput
					label="Protein"
					type="number"
					postfix="g"
					v-model="subject.macros.protein.value"
				/>
				<FoodModalInput
					label="Fat"
					type="number"
					postfix="g"
					v-model="subject.macros.fat.value"
				/>
				<FoodModalInput
					label="Carbs"
					type="number"
					postfix="g"
					v-model="subject.macros.carbs.value"
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
		isLoading: Boolean,
	},
	data () {
		return {
			subject: Utils.cloneDeep(this.initialItem),
		};
	},
};
</script>
