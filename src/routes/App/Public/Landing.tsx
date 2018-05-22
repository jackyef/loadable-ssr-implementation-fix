/**
 * Landing page (home) route
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { styles } from '../../../styles/routes/Public/Landing';

/**
 * Landing route
 */
const Landing: React.SFC<{}> = () => {
	return (
	<>
		<Helmet>
			<title>{ 'Home' }</title>
		</Helmet>

		<section className={ styles.top }>
			<p>{ 'Brand New Telegram Channel Manager' }</p>
		</section>
	</>
	);
};

export default Landing;
