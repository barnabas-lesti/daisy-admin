import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default (locale, messages = {}) => {
	return new VueI18n({
		locale,
		messages,
	});
};
