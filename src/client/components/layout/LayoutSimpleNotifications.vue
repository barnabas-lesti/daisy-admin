<template>
	<div class="LayoutSimpleNotifications">
		<LayoutSimpleNotification
			v-for="(notification, index) of notifications"
			class="LayoutSimpleNotifications_notification"
			:key="index"
			:type="notification.type"
			:title="notification.title"
			@close="removeNotification(index)"
		>
			{{ notification.content }}
		</LayoutSimpleNotification>
	</div>
</template>

<script>
import notificationService from '../../services/notificationService';

import LayoutSimpleNotification from './LayoutSimpleNotification';

export default {
	name: 'LayoutSimpleNotifications',
	components: {
		LayoutSimpleNotification,
	},
	methods: {
		removeNotification (index) {
			notificationService.removeNotificationByIndex(index);
		},
	},
	data () {
		return {
			notifications: notificationService.getNotifications(),
		};
	},
	created () {
		notificationService.starCleanupInterval();
	},
	beforeDestroy () {
		notificationService.stopCleanupInterval();
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';

.LayoutSimpleNotifications {
	position: fixed;
	bottom: 1rem;
	right: 1rem;
	max-width: 20rem;
	font-size: 1rem;

	&_notification {
		margin-bottom: 1rem;

		&:last-child {
			margin-bottom: 0rem;
		}
	}
}
</style>
