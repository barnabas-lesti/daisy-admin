<template>
	<div class="HomeView view">
		<h1>Home</h1>

		<div class="view_section view_section-description">
			<p>Nothing here yet, but I guess you’ve noticed it without me writing this down… <b>haha</b>.</p>
			<p>I use this page to test out new or existing components while developing.</p>
			<p>In the future some useful <b>widgets</b> might be available here, <b>settings</b>, etc.</p>
			<p>Or I’ll just delete this view, who knows…</p>
		</div>

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
