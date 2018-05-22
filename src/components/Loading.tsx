/**
 * Loading route component
 */
import React from 'react';
import { LoadingComponentProps } from 'react-loadable';

import { Icon } from '@scc/scc-ui-kit';

import { styles } from '../styles/components/LoadingRoute';

type ContentProps = {
	icon?: string;
	message?: string;
};

/**
 * Loading component content (icon & message)
 * @param {string} icon Icon
 * @param {string} message Message text
 */
const LoadingContent: React.SFC<ContentProps> = ({ icon, message }) => (
	<div className={ styles.self }>
		<Icon icon={ icon } />
		<span>{ message }</span>
	</div>
);

type Props = LoadingComponentProps;

/**
 * Loading component
 */
const Loading: React.SFC<Props> = ({ error, pastDelay, timedOut }) => {

	// Failed
	if (error) {
		return (
			<LoadingContent icon="fas exclamation-triangle"
				message="Loading failed. Do not worry just try to reload a page."
			/>
		);
	}

	// Loading (Pending)
	else if (pastDelay) {
		return (
			<LoadingContent icon="fas fa-spinner fa-pulse"
				message="Wait a second we are almost finished"
			/>
		);
	}

	// Timeout
	else if (timedOut) {
		return (
			<LoadingContent icon="fas exclamation-triangle"
				message="Timeout. Do not worry just try to reload a page."
			/>
		);
	}

	// Do not render anything
	// if component loads quick ib order
	// to avoid blink of the Loading component
	else {
		return null;
	}
};

export default Loading;
