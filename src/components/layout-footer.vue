<template lang="pug">
  v-footer.layout-footer.mt-5.light-blue.darken-4(height='auto', dark)
    v-container
      v-layout(justify-center, row, wrap)
        v-flex.my-4.text-xs-center(xs12)
          v-btn.mx-2(v-for='item in socialItems', :key='item.url', :href='item.url' target='_blank', icon)
            v-avatar.elevation-2(size='36')
              img(:src='item.iconImagePath', :alt='item.name')
        v-flex.mb-4.text-xs-center(v-html="$t('layoutFooter.descriptionHtml')", xs12)
        v-flex.mb-4.text-xs-center(v-html="$t('layoutFooter.copyrightHtml')", xs12)
</template>

<script>
const socialItems = [
  {
    name: 'Facebook',
    iconImagePath: '/images/social/facebook.png',
    url: 'https://www.facebook.com/',
  },
  {
    name: 'Instagram',
    iconImagePath: '/images/social/instagram.png',
    url: 'https://www.instagram.com/',
  },
  {
    name: 'Patreon',
    iconImagePath: '/images/social/patreon.png',
    url: 'https://www.patreon.com/',
  },
];

export default {
  name: 'LayoutFooter',
  data () {
    return {
      socialItems,
    };
  },
};
</script>

<i18n>
en:
  layoutFooter:
    descriptionHtml: Lorem ipsum dolor sit amet. <strong>Quisque porttitor nibh</strong> id massa semper, non dictum ex cursus. Cras venenatis euismod dapibus.
    copyrightHtml: "&copy;2019 — <strong>RainbowSoft</strong>"
</i18n>
