<template>
	<div class="App">
		<Header />
		<Sidebar />
		<div class="App_content">
			<router-view/>
		</div>
	</div>
</template>

<script>
import Header from './partials/Header.vue';
import Sidebar from './partials/Sidebar.vue';

export default {
	components: {
		Header,
		Sidebar,
	},
};
</script>

<style lang="less">
@import (reference) './styles/variables.less';

.App {
	&_content {
		padding-top: @layout_headerHeight;
		padding-left: @layout_sidebarWidth;
	}
}
</style>
