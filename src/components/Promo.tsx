/**
 * Promo section on top of the page
 */
import React from 'react';

import { BtnNav } from '@scc/scc-ui-kit';

import { routes } from '../config';

import { styles as stylesBtn } from '../styles/components/Btn';
import { styles } from '../styles/components/Promo';

/**
 * Promo component
 */
const Promo: React.SFC<{}> = () => {
	return(
		<section className={ styles.self }>

			{/* Promo text */}
			<div className={ styles.text }>
				<h1>{ 'Platform \nfor telegram channels' }</h1>
				<span>{ 'Tools to write, organise and schedule your posts.' }</span>
				<BtnNav url={ routes.auth.signup } title="Get Started" styles={ stylesBtn } />
			</div>

			{/* Paralax illustration */}
			<img className={ styles.image } src="/static/public/images/promo_paralax.svg" />

		</section>
	);
};

export default Promo;
