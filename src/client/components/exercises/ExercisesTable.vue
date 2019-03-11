<template>
	<div class="ExercisesTable">
		<p v-if="exercises.length === 0">
			{{ $t('exercises.table.noExerciseFound') }}
		</p>

		<div
			v-else
			class="table table-fullWidth table-hoverable"
		>
			<div class="table_header">
				<div class="table_row">
					<div class="table_cell">{{ $t('exercises.table.header.name') }}</div>
					<div class="table_cell">{{ $t('exercises.table.header.calorieBurn') }}</div>
					<div class="table_cell">{{ $t('exercises.table.header.duration') }}</div>
					<div class="table_cell">{{ $t('exercises.table.header.repetitions') }}</div>
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
					<div class="table_cell">{{ exercise.activity.duration.value ? `${exercise.activity.duration.value} ${$tc('common.units.minutes', exercise.activity.duration.value)}` : '' }}  </div>
					<div class="table_cell">{{ exercise.activity.reps.value ? `${exercise.activity.reps.value} ${$tc('common.units.repetitions', exercise.activity.reps.value)}` : '' }}</div>
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
};
</script>
