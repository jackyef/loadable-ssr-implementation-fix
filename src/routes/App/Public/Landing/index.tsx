/**
 * Landing page (home) route
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import importedStyles from './Landing.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

/**
 * Landing route
 */
const Landing: React.FC<{}> = () => {
	return (
		<>
			<Helmet>
				<title>{ 'Just create and we take care of the rest' }</title>
			</Helmet>

			{/* Content cards */}
			<main className={ styles.self }>
				{ 'Landing' }
				{/* TODO: Add landing content here */}
			</main>
		</>
	);
};

export default Landing;
