/**
 * Landing page (home) route
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import {
	PublicPromo,
	CardProductPoster,
	CardProductMarket,
	CardWtf,
	CardAbout
} from '@tg/ui';

/**
 * Landing route
 */
const Landing: React.SFC<{}> = () => {
	return (
	<>
		<Helmet>
			<title>{ 'Telegram channel manager and ad market' }</title>
		</Helmet>

		{/* Full page promo */}
		<PublicPromo />

		{/* Content cards */}
		<main>
			<CardProductPoster />
			<CardWtf />
			<CardProductMarket />
			<CardAbout />
		</main>
	</>
	);
};

export default Landing;
