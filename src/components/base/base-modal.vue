<template lang="pug">
  v-dialog.base-modal(:value='value', transition='dialog-bottom-transition', :fullscreen='$vuetify.breakpoint.xs',
    :hide-overlay='$vuetify.breakpoint.smAndDown', :max-width="$vuetify.breakpoint.smAndDown ? 'none' : '80%'",
    :width="$vuetify.breakpoint.xs ? 'auto' : width",
    lazy)
    v-card
      v-toolbar.blue.lighten-1(card, dark)
        v-toolbar-title(v-if='title') {{ title }}
        v-spacer
        v-toolbar-items
          v-btn(:loading='isLoading', icon, @click="emitAccept()")
            v-icon done
          v-btn(icon, @click="emitDiscard()")
            v-icon close
      v-card-text
        slot
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
    closeOnAccept: Boolean,
    closeOnDiscard: Boolean,
  },
  computed: {
    ...mapState([ 'isLoading' ]),
  },
  methods: {
    emitAccept () {
      this.$emit('accept');
      if (this.closeOnAccept) this.$emit('input', false);
    },
    emitDiscard () {
      this.$emit('discard');
      if (this.closeOnDiscard) this.$emit('input', false);
    },
  },
};
</script>
