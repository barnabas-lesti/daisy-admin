<template>
	<div class="DashboardView">
		<h1>Dashboard</h1>

		<div class="DashboardView_description">
			<p>Nothing here yet, but I guess you’ve noticed it without me writing this down… <b>haha</b>.</p>
			<p>I use this page to test out new or existing components while developing.</p>
			<p>In the future some useful <b>widgets</b> might be available here, <b>settings</b>, etc.</p>
			<p>Or I’ll just delete this view, who knows…</p>
		</div>

		<pre style="margin-bottom: 1rem;">{{ { count } }}</pre>

		<button
			class="button"
			style="margin-right: 1rem;"
			@click="onIncrementButtonClick()"
		>
			Increment
		</button>
		<button
			:class="[
				'button',
				{ 'is-loading': isLoading },
			]"
			@click="onIncrementAsyncButtonClick()"
		>
			Increment Async
		</button>
	</div>
</template>

<script>
import ActionTypes from '../../store/ActionTypes';
import MutationTypes from '../../store/MutationTypes';

export default {
	name: 'DashboardView',
	components: {},
	methods: {
		onIncrementButtonClick () {
			this.$store.commit(MutationTypes.dashboardView.INCREMENT);
		},
		onIncrementAsyncButtonClick () {
			this.isLoading = true;
			this.$store.dispatch(ActionTypes.dashboardView.INCREMENT_ASYNC)
				.then(() => {
					this.isLoading = false;
				});
		},
	},
	computed: {
		count () {
			return this.$store.state.count;
		},
	},
	data () {
		return {
			isLoading: false,
		};
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
