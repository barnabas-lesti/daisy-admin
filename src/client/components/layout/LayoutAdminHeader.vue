<template>
	<header class="LayoutAdminHeader">
		LayoutAdminHeader
	</header>
</template>

<script>
export default {
	name: 'LayoutAdminHeader',
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';

.LayoutAdminHeader {
	@_boxShadow: @common_bottomBoxShadow;
	@_height: @layout_headerHeight;

	box-shadow: @_boxShadow;
	height: @_height;
	position: fixed;
	width: 100%;
}
</style>
