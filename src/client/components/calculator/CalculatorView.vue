<template>
	<div class="CalculatorView view">
		<h1>{{ $t('calculator.view.title') }}</h1>

		<div
			class="view_section view_section-description"
			v-html="$t('calculator.view.descriptionHtml')"
		></div>

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
