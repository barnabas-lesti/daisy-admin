<template>
	<div class="App">
		<!-- <Header /> -->
		<Sidebar />
		<div class="App_content">
			<!-- <router-view /> -->
		</div>
	</div>
</template>

<script>
import Vue from 'vue';

// import Header from './partials/Header.vue';
import Sidebar from './partials/Sidebar.vue';

export default class App extends Vue {
	components = {
		// Header,
		Sidebar,
	};
	name = 'App';
}
</script>

<style lang="less">
@import './styles/variables.less';
</style>
