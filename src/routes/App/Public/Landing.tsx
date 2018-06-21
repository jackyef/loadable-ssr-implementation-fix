/**
 * Landing page (home) route
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import Promo from '../../../components/Promo';
import Poster from '../../../components/Poster';

/**
 * Landing route
 */
const Landing: React.SFC<{}> = () => {
	return (
	<>
		<Helmet>
			<title>{ 'Telegram channel manager and ad market' }</title>
		</Helmet>

		{/* Promo */}
		<Promo />

		{/* Content */}
		<main>
			<Poster />
		</main>
	</>
	);
};

export default Landing;
