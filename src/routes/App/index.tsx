import _ from 'lodash';
import React from 'react';
import { RouteConfig } from 'react-router-config';
import Cookies from 'js-cookie';
import Raven from 'raven-js';
import { Provider } from 'mobx-react';

import { NotifyBox } from '@scc/ui-kit';
import { renderRoutes } from '@tg/ui/utils';
import { api, Context } from '@tg/ui/config';

import { axiosInstance, context } from '../../config';
import { notifyStore } from '../../stores';

import '../../styles/base.less';

type Props = {
	route: RouteConfig & { render?: any };
};

export default class Container extends React.Component<Props> {

	componentWillMount() {

		// Try to get a message code on page load
		// to display a message from server
		const msg_code = Cookies.get('msg');

		// If code exists (it's max_age is about 10 seconds)
		// try to get a message from the server
		if (msg_code) {
			axiosInstance.get(`${ api.msg.get }/${ msg_code }`)

				// Awake a notification with a message data
				.then(response => {
					const { data } = response;
					notifyStore.awake({
						name: data.id || 0,
						header: data.title || 'Unknown message',
						text: data.text || `Some ${ data.status || 'problem' } occured but we can not provide a detailed information`,
						state: data.status || 'info',
						delay: data.status === 'error' ? null : 8000
					});
				})

				// If message get failed - display an error
				// instead of message
				.catch(err => {
					const msg = _.get(err, 'data.message', `Can not receive a message for the code: ${ msg_code }`);
					console.error(msg);
					Raven.captureMessage(msg);
					notifyStore.awake({
						name: 'unknownMessage',
						header: 'Unknown message',
						text: msg,
						state: 'info',
						delay: 8000
					});
				})
			;
		}
	}

	render() {
		const { route } = this.props;

		return (
			<Provider>
				<Context.Provider value={ context }>
					<NotifyBox store={ notifyStore } />
					{ renderRoutes(route.routes) }
				</Context.Provider>
			</Provider>
		);
	}
}
