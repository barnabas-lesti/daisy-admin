<template lang="pug">
  .pages-sign-out
</template>

<script>

export default {
  name: 'PagesSignOut',
  head () {
    return {
      title: this.$t('pages.signOut.title'),
    };
  },
  created () {
    this.$store.commit('auth/signOut');
    const ref = this.$route.query['ref'];
    this.$router.push(ref ? { name: ref } : this.localePath({ name: 'sign-in' }));
  },
};
</script>
