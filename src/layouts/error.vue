<template lang="pug">
  v-layout.pages-error.text-xs-center.pt-5(row, wrap)
    v-flex(xs12)
      h1 {{ $t(`${error.statusCode === 404 ? 'notFound' : 'serverError'}.content`) }}
    v-flex(xs12)
      a.subheading(@click='$router.back()') {{ $t('goBack') }}
</template>

<script>
export default {
  head () {
    return {
      title: this.$t(`${this.error.statusCode === 404 ? 'notFound' : 'serverError'}.title`),
      meta: [ { name: 'description', content: this.$t(`${this.error.statusCode === 404 ? 'notFound' : 'serverError'}.description`) } ],
    };
  },
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
