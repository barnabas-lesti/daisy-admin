<template>
	<div class="HomeView view">
		<h1>{{ $t('views.home.title') }}</h1>

		<div
			v-html="$t('views.home.descriptionHtml')"
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
