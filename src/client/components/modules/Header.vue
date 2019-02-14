<template>
	<header class="Header">
		Header
	</header>
</template>

<script>
export default {
	name: 'Header',
};
</script>

<style lang="less">
@import (reference) '../../styles/variables.less';

.Header {
	@_boxShadow: @common_bottomBoxShadow;
	@_height: @layout_headerHeight;

	box-shadow: @_boxShadow;
	height: @_height;
	position: fixed;
	width: 100%;
}
</style>
