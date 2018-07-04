/**
 * Promo section on top of the page
 */
import React from 'react';

import { BtnNav } from '@scc/scc-ui-kit';

import { routes, staticImagesPath } from '../config';

import modules from '@tg/ui/lessmodules';
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
				<BtnNav url={ routes.auth.signup } title="Get Started" styles={{ theme: modules.btn.white }} />
			</div>

			{/* Paralax illustration */}
			<img className={ styles.image } src={`${ staticImagesPath }/promo_paralax.svg`} />

		</section>
	);
};

export default Promo;
