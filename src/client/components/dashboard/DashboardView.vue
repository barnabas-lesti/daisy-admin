<template>
	<div class="DashboardView">
		<h1>Dashboard</h1>

		<div class="field">
			<FoodTable
				v-model="food"
				@select="onFoodSelect($event)"
			/>
		</div>

		<FoodModal
			v-if="modalSubject"
			:initialItem="modalSubject"
		/>

		<pre>{{ food }}</pre>
	</div>
</template>

<script>
import FoodTable from '../food/FoodTable';
import FoodModal from '../food/FoodModal';

export default {
	name: 'DashboardView',
	components: {
		FoodTable,
		FoodModal,
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

.DashboardView {
	&:extend(.page all);
}
</style>
