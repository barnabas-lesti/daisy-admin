import Vue from 'vue';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validators = {
  required: message => value => !!value || message,
  email: message => value => EMAIL_REGEX.test(value) || message,
  sameAs: (subject, message) => value => subject === value || message,
};

export default (context) => {
  context.$validators = validators;
  Vue.prototype.$validators = validators;
};
