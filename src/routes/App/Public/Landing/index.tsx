/**
 * Landing page (home) route
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { Promo } from '../../../../components';

/**
 * Landing route
 */
const Index: React.SFC<{}> = () => {
	return (
	<>
		<Helmet>
			<title>{ 'Just create and we take care of the rest' }</title>
		</Helmet>

		{/* Content cards */}
		<main>
			<Promo />
		</main>
	</>
	);
};

export default Index;
