<template lang="pug">
  .pages-food-id
    pre {{ food }}
</template>

<script>
export default {
  name: 'PagesFoodId',
  head () {
    return {
      title: this.food.content.name || this.$t('fallbackTitle'),
      meta: [ { name: 'description', content: this.food.content.description } ],
    };
  },
  async asyncData ({ params, $axios }) {
    return { food: await $axios.$get(`/api/food/${params.id}`) };
  },
};
</script>

<i18n>
en:
  fallbackTitle: Just a food
</i18n>
