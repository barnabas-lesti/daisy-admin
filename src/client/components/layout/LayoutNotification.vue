<template>
	<div class="LayoutNotification">
		<LayoutNotificationItem
			v-for="(notification, index) of notifications"
			class="LayoutNotification_item"
			:key="index"
			:type="notification.type"
			:title="notification.title"
			@close="removeNotification(index)"
		>
			{{ notification.content }}
		</LayoutNotificationItem>
	</div>
</template>

<script>
import notificationService from '../../services/notificationService';

import LayoutNotificationItem from './LayoutNotificationItem';

export default {
	name: 'LayoutSimpleNotification',
	components: {
		LayoutNotificationItem,
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
};
</script>

<style lang="less">
.LayoutNotification {
	position: fixed;
	bottom: 1rem;
	right: 1rem;
	width: 20rem;
	font-size: 1rem;

	&_item {
		margin-bottom: 1rem;

		&:last-child {
			margin-bottom: 0rem;
		}
	}
}
</style>
