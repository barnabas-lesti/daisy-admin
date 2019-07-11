import Vue from 'vue';

class Auth {}

export default (context) => {
  const auth = new Auth(context.$firebase);
  context.$auth = auth;
  Vue.prototype.$auth = auth;
};
