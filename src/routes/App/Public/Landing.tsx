/**
 * Landing page (home) route
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import Promo from '../../../components/Blocks/Promo';
import Poster from '../../../components/Blocks/Poster';
import Wtf from '../../../components/Blocks/Wtf';
import Market from '../../../components/Blocks/Market';

/**
 * Landing route
 */
const Landing: React.SFC<{}> = () => {
	return (
	<>
		<Helmet>
			<title>{ 'Telegram channel manager and ad market' }</title>
		</Helmet>

		<Promo />

		<main>
			<Poster />
			<Wtf />
			<Market />
		</main>
	</>
	);
};

export default Landing;
