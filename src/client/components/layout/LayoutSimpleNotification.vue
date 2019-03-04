<template>
	<div class="LayoutSimpleNotification">
		<LayoutSimpleNotificationItem
			v-for="(notification, index) of notifications"
			class="LayoutSimpleNotification_item"
			:key="index"
			:type="notification.type"
			:title="notification.title"
			@close="removeNotification(index)"
		>
			{{ notification.content }}
		</LayoutSimpleNotificationItem>
	</div>
</template>

<script>
import notificationService from '../../services/notificationService';

import LayoutSimpleNotificationItem from './LayoutSimpleNotificationItem';

export default {
	name: 'LayoutSimpleNotification',
	components: {
		LayoutSimpleNotificationItem,
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
@import (reference) '../../styles/variables';

.LayoutSimpleNotification {
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
