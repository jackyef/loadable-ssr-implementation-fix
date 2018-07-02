/**
 * Landing page (home) route
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import Promo from '../../../components/Promo';
import Poster from '../../../components/Poster';
import Wtf from '../../../components/Wtf';
import Market from '../../../components/Market';
import About from '../../../components/About';

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
			<About />
		</main>
	</>
	);
};

export default Landing;
