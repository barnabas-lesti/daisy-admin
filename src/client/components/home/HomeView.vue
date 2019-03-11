<template>
	<div class="HomeView view">
		<h1>{{ $t('home.view.title') }}</h1>

		<div
			v-html="$t('home.view.descriptionHtml')"
			class="view_section view_section-description"
		></div>
	</div>
</template>

<script>
export default {
	name: 'HomeView',
	components: {},
	methods: {},
	data () {
		return {};
	},
};
</script>

<style lang="less">
.HomeView {}
</style>
