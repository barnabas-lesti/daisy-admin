<template>
	<div class="CalculatorView view">
		<h1>Calculator</h1>

		<div class="view_section view_section-description">
			<p>On this page you can calculate a calorie and macro summary of different food combinations.</p>
			<p>Search for food using the <b>food search module</b> on the right-hand side and add food to the calorie calculator by clicking on an item.</p>
			<p>You can customize the <b>serving amount</b> of the added food using the <b>inputs in the calculator table</b>.</p>
			<p>A <b>trash icon</b> will appear on items when hoovered, click on this icon to remove an item from the table.</p>
		</div>

		<div class="view_section">
			<Calculator v-model="calculatorData" />
		</div>
	</div>
</template>

<script>
import Calculator from './Calculator';

export default {
	name: 'CalculatorView',
	components: {
		Calculator,
	},
	data () {
		return {
			calculatorData: [],
		};
	},
};
</script>
