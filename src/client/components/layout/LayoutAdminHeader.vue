<template>
	<header class="LayoutAdminHeader"></header>
</template>

<script>
export default {
	name: 'LayoutAdminHeader',
};
</script>

<style lang="less">
@import (reference) '../../styles/variables.less';

.LayoutAdminHeader {
	@_boxShadow: 0 2px 4px 0 rgba(43, 43, 43, .1);
	@_height: @layout_adminHeaderHeight;

	box-shadow: @_boxShadow;
	height: @_height;
	position: fixed;
	width: 100%;
}
</style>
