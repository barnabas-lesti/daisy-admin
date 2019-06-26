<template>
	<div>
		<layout-header />

		<nuxt />

		<layout-footer />
	</div>
</template>

<script>
import LayoutHeader from '../components/layout/layout-header';
import LayoutFooter from '../components/layout/layout-footer';

export default {
	name: 'LayoutDefault',
	components: {
		LayoutHeader,
		LayoutFooter,
	},
};
</script>
