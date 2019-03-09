<template>
	<div class="HomeView view">
		<h1>{{ $t('views.home.title') }}</h1>

		<div
			v-html="$t('views.home.description')"
			class="view_section view_section-description"
		></div>

		<div class="view_section">
			<Spinner dark />
		</div>
	</div>
</template>

<script>
import Spinner from '../common/Spinner';

export default {
	name: 'HomeView',
	components: {
		Spinner,
	},
	methods: {},
	data () {
		return {};
	},
};
</script>

<style lang="less">
.HomeView {}
</style>
