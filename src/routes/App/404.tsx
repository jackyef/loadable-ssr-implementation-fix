/**
 * Common error scene
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { BtnNav } from '@scc/scc-ui-kit';

import { routes } from '../../config/index';

type Props = {
	staticContext: any;
};

const defaultProps: Partial<Props> = {
	staticContext: {}
};

/**
 * Error scene
 */
const Error: React.SFC<Props> = ({ staticContext }) => {

	staticContext.notFound = true;

	return (
		<section>

			{/* Helmet */}
			<Helmet>
				<title>{ '404 - Not found' }</title>
			</Helmet>

			{/* Content */}
			<h1>{ '404' }</h1>
			<BtnNav url={ routes.home } title="Homepage" />

		</section>
	);
};

Error.defaultProps = defaultProps;

export default {
	component: Error
};
