<template>
	<nav class="Sidebar">
		Sidebar

		<!-- <router-link to="/">Dashboard</router-link> -->
	</nav>
</template>

<script>
import Vue from 'vue';

class Sidebar extends Vue {
	name ='Sidebar';
}

export default Sidebar;
</script>

<style lang="less">
@import '../styles/variables.less';

.Sidebar {}
</style>
