import React, { useEffect } from 'react';
import { RouteConfig } from 'react-router-config';
import Cookies from 'js-cookie';
// import Raven from 'raven-js';

import { NotifyBox } from '@tg/notify';
import { renderRoutes, canUseDOM } from '@tg/kit-utils';
import { NotifyCommon } from '@tg/notifications';

import { notifyStore } from '../../stores';

// eslint-disable-next-line import/no-internal-modules
import '../../styles/base.less';

type Props = {
	route: RouteConfig & { render?: any };
};

const Container: React.FC<Props> = ({ route }) => {

	// did mount
	useEffect(() => {

		// Check if we want to clear id_token from local storage
		if (canUseDOM() && Cookies.get('remove_id_token')) {
			localStorage.removeItem('id_token');
			Cookies.remove('remove_id_token');
		}

		// Try to get a message code on page load
		// to display a message from server
		const notification = canUseDOM() && Cookies.get('notify');

		// If code exists (it's max_age is about 10 seconds)
		// try to get a message from the server
		if (notification) {
			setTimeout(() => {
				notifyStore.awake({
					name: 'cookieNotification',
					header: notification,
					state: 'success',
					delay: 8000
				});

				// Remove cookie afterwards
				Cookies.remove('notify');
			});
		}
	}, []);

	return (
		<>
			<NotifyBox store={ notifyStore } notification={ NotifyCommon } />
			{ renderRoutes(route.routes) }
		</>
	);
};

export default Container;
