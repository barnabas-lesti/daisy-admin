<template>
	<header class="Header">
		Header
	</header>
</template>

<script>
import Vue from 'vue';

export default class Header extends Vue {
	name ='Header';
}
</script>

<style lang="less">
@import '../styles/variables.less';

.Header {}
</style>
