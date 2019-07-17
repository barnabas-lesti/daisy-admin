<template lang="pug">
  v-dialog.base-modal(:value='value', transition='dialog-bottom-transition', :fullscreen='$vuetify.breakpoint.smAndDown',
    :hide-overlay='$vuetify.breakpoint.smAndDown', :max-width="$vuetify.breakpoint.smAndDown ? 'none' : '80%'",
    :width="$vuetify.breakpoint.smAndDown ? 'auto' : width",
    lazy)
    v-card
      v-toolbar.blue.lighten-1(card, dark)
        v-toolbar-title(v-if='title') {{ title }}
        v-spacer
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
      type: Boolean,
      default: () => false,
    },
    title: {
      type: String,
      default: () => '',
    },
    width: {
      type: String,
      default: () => 'auto',
    },
  },
  computed: {
    ...mapState([ 'isLoading' ]),
  },
};
</script>
