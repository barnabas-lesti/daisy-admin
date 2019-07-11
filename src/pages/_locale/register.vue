<template lang="pug">
  v-layout.pages-register(row, wrap)
    v-flex(xs12).text-xs-center
      h1 {{ $t('title') }}

    v-flex(xs12).text-xs-center
      .pb-3(v-html="$t('descriptionHtml')")

    v-flex(xs12)
      v-card
</template>

<script>
export default {
  name: 'PagesIndex',
  head () {
    return {
      title: this.$t('title'),
      meta: [ { name: 'description', content: this.$t('description') } ],
    };
  },
  data () {
    return {

    };
  },
};
</script>

<i18n>
en:
  title: Register
  description: Register an account to access the cool features of Daisy!
  descriptionHtml: "Register an account to access the cool features of <strong>Daisy</strong>!"
</i18n>
