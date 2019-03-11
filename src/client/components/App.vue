<template>
	<div class="App">
		<Layout>
			<router-view />
		</Layout>
	</div>
</template>

<script>
import config from '../common/config';
import logger from '../common/logger';
import storageService, { StorageKeys } from '../services/storageService';

const getLayout = () => {
	const url = new URL(window.location.href);
	const forcedLayout = url.searchParams.get('layout');
	if (forcedLayout) {
		storageService.saveToLocalStorage(StorageKeys.common.LAYOUT, forcedLayout);
	}
	const layoutName = forcedLayout || storageService.fetchFromLocalStorage(StorageKeys.common.LAYOUT) || config.DEFAULT_LAYOUT;
	logger.info(`Using layout: "${layoutName}"`);
	return layoutName;
};

export default {
	components: {
		Layout: () => import(`./layout/${getLayout()}`),
	},
};
</script>

<style lang="less">
.App {
	height: 100%;
}
</style>
