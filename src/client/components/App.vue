<template>
	<div class="App">
		<Layout>
			<router-view />
		</Layout>
	</div>
</template>

<script>
import config from '../common/config';
import storageService, { StorageKeys } from '../services/storageService';

const getLayoutName = () => {
	const url = new URL(window.location.href);
	const forcedLayout = url.searchParams.get('layout');
	if (forcedLayout) {
		storageService.saveToLocalStorage(StorageKeys.common.LAYOUT, forcedLayout);
	}
	const layout = forcedLayout || storageService.fetchFromLocalStorage(StorageKeys.LAYOUT) || config.DEFAULT_LAYOUT;
	console.log(`[Daisy] Using layout: "${layout}".`);
	return layout;
};

export default {
	components: {
		Layout: () => import(`./layout/${getLayoutName()}`),
	},
};
</script>

<style lang="less">
.App {
	height: 100%;
}
</style>
