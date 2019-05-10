<template>
	<div class="App">
		<LayoutSimple>
			<router-view />
		</LayoutSimple>
	</div>
</template>

<script>
import LayoutSimple from './layout/LayoutSimple';

export default {
	components: {
		LayoutSimple,
	},
};
</script>

<style lang="less">
.App {
	height: 100%;
}
</style>
