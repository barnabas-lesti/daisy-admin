<template>
	<div class="ExercisesTable">
		<p v-if="exercises.length === 0">
			No exercises found.
		</p>

		<div
			v-else
			class="table table-fullWidth table-hoverable"
		>
			<div class="table_header">
				<div class="table_row">
					<div class="table_cell">Name</div>
					<div class="table_cell">Calorie burn</div>
					<div class="table_cell">Duration</div>
					<div class="table_cell">Reps</div>
				</div>
			</div>
			<div class="table_body">
				<router-link
					v-for="(exercise, index) of exercises"
					class="table_row"
					:key="index"
					:to="{
						name: 'exerciseEdit',
						params: {
							_id: exercise._id,
							exercise,
						},
					}"
				>
					<div class="table_cell">{{ exercise.name }}</div>
					<div class="table_cell">{{ exercise.calorieBurn.value }} kcal</div>
					<div class="table_cell">{{ renderActivityValue(exercise.activity.duration.value, 'min', 'mins') }}</div>
					<div class="table_cell">{{ renderActivityValue(exercise.activity.reps.value, 'rep', 'reps') }}</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ExercisesTable',
	props: {
		exercises: {
			default: () => [],
			type: Array,
		},
	},
	methods: {
		renderActivityValue (value, singularPostfix, pluralPostfix) {
			return value ? `${value} ${value > 1 ? pluralPostfix : singularPostfix}` : '';
		},
	},
};
</script>
