/**
 * Landing page (home) route
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { Promo } from './Promo';
import { Demo } from './Demo';
import { Blogs } from './Blogs';
import { Feed } from './Feed';
import { Editor } from './Editor';
import { EditorMore } from './EditorMore';

import importedStyles from './Landing.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	demo?: string;
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
				<Promo />
				<Demo className={ styles.demo } />
				<Blogs />

				{/* Center */}
				<Feed />
				<Editor />
				<EditorMore />

				{/* Bottom */}
				{/* Statistics component here */}
				{/* Pricing component here */}
				{/* Get started component here */}

			</main>
		</>
	);
};

export default Landing;
