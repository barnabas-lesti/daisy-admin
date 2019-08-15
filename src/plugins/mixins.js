import Vue from 'vue';

const _normalizeQueryPayload = (payload) => {
  const normalizedQuery = {};
  for (const key of Object.keys(payload)) {
    normalizedQuery[key] = payload[key] || undefined;
  }
  return normalizedQuery;
};

Vue.mixin({
  methods: {
    pushRouteQuery (payload) {
      this.$router.push({ query: { ...this.$route.query, ..._normalizeQueryPayload(payload) } });
    },
  },
});
