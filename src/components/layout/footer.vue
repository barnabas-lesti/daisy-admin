<template lang="pug">
  v-footer.layout-footer.mt-5.light-blue.darken-4(
    height='auto',
    dark,
  )
    v-container
      v-layout(
        justify-center,
        row,
        wrap,
      )
        v-flex.my-4.text-xs-center(xs12)
          v-btn.mx-2(
            v-for='item in socialItems',
            :key='item.url',
            :href='item.url'
            target='_blank',
            icon,
          )
            v-avatar.elevation-2(size='36')
              img(
                :src='item.iconImagePath',
                :alt='item.name',
              )
        v-flex.mb-4.text-xs-center(
          v-html="$t('components.layout.footer.descriptionHtml')",
          xs12,
        )
        v-flex.mb-4.text-xs-center(
          v-html="$t('components.layout.footer.copyrightHtml')",
          xs12,
        )
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LayoutFooter',
  computed: {
    ...mapState('navigation', [ 'socialItems' ]),
  },
};
</script>
