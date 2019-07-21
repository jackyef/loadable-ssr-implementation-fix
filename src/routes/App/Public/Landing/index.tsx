/**
 * Landing page (home) route
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { ContentBlock } from '../../../../components';
import { Promo } from './Promo';

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

				{/* Top */}
				<ContentBlock>
					<Promo />
				</ContentBlock>
			</main>
		</>
	);
};

export default Landing;
