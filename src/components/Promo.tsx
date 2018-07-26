/**
 * Promo section on top of the page
 */
import React from 'react';

import { Btn } from '@tg/ui';

import { routes, staticImagesPath } from '../config';

import { styles } from '../styles/components/Promo';

/**
 * Promo component
 */
const Promo: React.SFC<{}> = () => {
	return(
		<section className={ styles.self }>

			{/* Promo text */}
			<div className={ styles.text }>
				<h1>{ 'Platform \nfor' }&nbsp;telegram channels</h1>
				<span>{ 'Tools to write, organise and schedule your posts.' }</span>
				<Btn nav type="general" hint="white" url={ routes.auth.signup } title="Get Started" />
			</div>

			{/* Paralax illustration */}
			<img className={ styles.image } src={`${ staticImagesPath }/promo_paralax.svg`} />

		</section>
	);
};

export default Promo;
