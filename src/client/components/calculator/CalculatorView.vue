<template>
	<div class="CalculatorView">
		<h1>Calculator</h1>

		<div class="CalculatorView_description">
			<p>On this page you can calculate a calorie and macro summary of different food combinations.</p>
			<p>Search for food using the <b>food search module</b> on the right-hand side and add food to the calorie calculator by clicking on an item.</p>
			<p>You can customize the <b>serving amount</b> of the added food using the <b>inputs in the calculator table</b>.</p>
			<p>A <b>trash icon</b> will appear on items when hoovered, click on this icon to remove an item from the table.</p>
		</div>

		<CalculatorMain />
	</div>
</template>

<script>
import CalculatorMain from './CalculatorMain';

export default {
	name: 'CalculatorView',
	components: {
		CalculatorMain,
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/partials';
@import (reference) '../../styles/variables';

.CalculatorView {
	&:extend(.page all);

	&_description {
		margin-bottom: 1.5rem;
		font-size: .9em;
	}
}
</style>
