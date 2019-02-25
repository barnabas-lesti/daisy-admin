<template>
	<div class="DashboardView">
		<h1>Dashboard</h1>

		<div class="DashboardView_description">
			<p>Nothing here yet, but I guess you’ve noticed it without me writing this down… <b>haha</b>.</p>
			<p>I use this page to test out new or existing components while developing.</p>
			<p>In the future some useful <b>widgets</b> might be available here, <b>settings</b>, etc.</p>
			<p>Or I’ll just delete this view, who knows…</p>
		</div>
	</div>
</template>

<script>
import Tooltip from '../common/Tooltip';

export default {
	name: 'DashboardView',
	components: {
		Tooltip,
	},
	data () {
		return {};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/partials';

.DashboardView {
	&:extend(.page all);

	&_description {
		margin-bottom: 1.5rem;
		font-size: .9em;
	}
}
</style>
