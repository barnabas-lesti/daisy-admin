<template>
	<div class="HomeView view">
		<div class="field">
			<img
				src="daisy-logo.jpg"
				class="HomeView_logo"
			/>
		</div>

		<div
			v-for="(card, index) of cards"
			:key="index"
			class="field field-space2"
		>
			<HomeCard :model="card" />
		</div>

	</div>
</template>

<script>
import HomeCard from './HomeCard';

export default {
	name: 'HomeView',
	components: {
		HomeCard,
	},
	methods: {},
	data () {
		return {
			cards: [
				{
					linkTo: { name: 'calculator' },
					icon: 'calculator',
					title: this.$t('calculator.view.title'),
					descriptionHtml: this.$t('calculator.view.descriptionHtml'),
				},
				{
					linkTo: { name: 'food' },
					icon: 'food',
					title: this.$t('food.view.title'),
					descriptionHtml: this.$t('food.view.descriptionHtml'),
				},
				{
					linkTo: { name: 'recipes' },
					icon: 'recipes',
					title: this.$t('recipes.view.title'),
					descriptionHtml: this.$t('recipes.view.descriptionHtml'),
				},
				{
					linkTo: { name: 'exercises' },
					icon: 'exercise',
					title: this.$t('exercises.view.title'),
					descriptionHtml: this.$t('exercises.view.descriptionHtml'),
				},
			],
		};
	},
};
</script>

<style lang="less">
.HomeView {
	&_logo {
		width: 100%;
		max-width: 15rem;
		margin: 4rem auto;
		display: block;
	}
}
</style>
