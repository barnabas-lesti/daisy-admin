<template>
	<div class="ProfileRegistrationView">
		<h1>Register</h1>

		<div class="ProfileRegistrationView_description">
			<p>Register by <b>filling out the form below</b> to get access to cool features.</p>
		</div>

		<form>
			<ProfileRegistrationInput
				v-model="email"
				label="Email"
				type="email"
				placeholder="your-email@mail.io"
			/>
			<ProfileRegistrationInput
				v-model="password"
				label="Password"
				type="password"
			/>
			<ProfileRegistrationInput
				v-model="passwordConfirm"
				label="Confirm your password"
				type="password"
			/>
		</form>
	</div>
</template>

<script>
import ProfileRegistrationInput from './ProfileRegistrationInput';

export default {
	name: 'ProfileRegistrationView',
	components: {
		ProfileRegistrationInput,
	},
	methods: {},
	watch: {
		email (newValue) {
			console.log(newValue);
		},
	},
	data () {
		return {
			email: '',
			password: '',
			passwordConfirm: '',
		};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';
@import (reference) '../../styles/partials';

.ProfileRegistrationView {
	&:extend(.page all);

	&_description {
		margin-bottom: 1.5rem;
		font-size: .9em;
	}
}
</style>
