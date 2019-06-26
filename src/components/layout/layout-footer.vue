<template>
	<footer class="layout-footer">
		<div class="layout-footer_content container">
			<div class="layout-footer_links">
				<router-link
					v-for="(item, index) in menuItems"
					:key="index"
					:active-class="!item.exact ? 'layout-footer_link-active' : ''"
					:exact-active-class="item.exact ? 'layout-footer_link-active' : ''"
					:to="{ name: item.routeName }"
					class="layout-footer_link"
				>
					{{ $t(item.labelKey) }}
				</router-link>
			</div>
			<div v-html="$t('common.copyrightHtml')" />
		</div>
	</footer>
</template>

<script>
import menuItems from '../../common/menu-items';

export default {
	name: 'LayoutFooter',
	data () {
		return {
			menuItems,
		};
	},
};
</script>

<style lang="less">
.layout-footer {

}
</style>
