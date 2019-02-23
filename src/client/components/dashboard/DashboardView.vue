<template>
	<div class="DashboardView">
		<h1>Dashboard</h1>
	</div>
</template>

<script>
export default {
	name: 'DashboardView',
	components: {},
	data () {
		return {};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/partials';

.DashboardView {
	&:extend(.page all);
}
</style>
