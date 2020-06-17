import React, { useEffect } from 'react';
import { RouteConfig } from 'react-router-config';
import Cookies from 'js-cookie';

import { ThemeProvider } from '@tg/styled';
import { NotifyBox } from '@tg/notify';
import { theme, Notification } from '@tg/elm';
import { renderRoutes, canUseDOM } from '@tg/utils';

import { notifyStore } from 'app/stores';
import { history } from 'app/routes';

import { initGA, trackPageView } from './ga';

// eslint-disable-next-line import/no-internal-modules
import '../../styles/base.less';

type Props = {
	route: RouteConfig;
};

const Container: React.FC<Props> = ({ route }) => {

	// did mount
	useEffect(() => {

		// GA
		if (canUseDOM() && history) {
			initGA(history);
			trackPageView(history);
		}

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
					text: notification,
					state: 'success'
				});

				// Remove cookie afterwards
				Cookies.remove('notify');
			});
		}
	}, []);

	return (
		<ThemeProvider theme={ theme }>
			<NotifyBox store={ notifyStore } notification={ Notification } />
			{ renderRoutes(route.routes) }
		</ThemeProvider>
	);
};

export default Container;
