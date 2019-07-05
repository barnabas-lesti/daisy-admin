<template lang="pug">
	v-dialog.base-modal(:value='value', transition='dialog-bottom-transition', :fullscreen='$vuetify.breakpoint.smAndDown',
		:hide-overlay='$vuetify.breakpoint.smAndDown', :max-width="$vuetify.breakpoint.smAndDown ? 'none' : '80%'",
		lazy)
		v-card.pb-5
			v-toolbar.blue.lighten-1(card, dark)
				v-toolbar-title(v-if='title') {{ title }}
				v-spacer(v-if='title')
				v-toolbar-items
					v-btn(:loading='isLoading', icon, @click="$emit('accept')")
						v-icon done
					v-btn(icon, @click="$emit('discard')")
						v-icon close
			slot(name='content')
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'BaseLoader',
	props: {
		value: {
			type: String,
			default: () => '',
		},
		title: {
			type: String,
			default: () => '',
		},
	},
	computed: {
		...mapState([ 'isLoading' ]),
	},
};
</script>
