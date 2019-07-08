<template lang="pug">
  .pages-exercises-id
    pre {{ exercise }}
</template>

<script>
export default {
  name: 'PagesExercisesId',
  head () {
    return {
      title: this.exercise.content.name || this.$t('fallbackTitle'),
      meta: [ { name: 'description', content: this.exercise.content.description } ],
    };
  },
  async asyncData ({ params, $axios }) {
    return { exercise: await $axios.$get(`/api/exercises/${params.id}`) };
  },
};
</script>

<i18n>
en:
  fallbackTitle: Just an exercise
</i18n>
