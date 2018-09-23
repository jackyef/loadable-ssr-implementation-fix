/**
 * Top section of the Landing page
 * @module Promo
 */
import React from 'react';

import { Headline } from '@tg/ui';
import SubscribeForm from '../SubscribeForm';

import images from '../../../resources';
const styles: Styles = require('./Promo.module.less');

type Styles = {
	self?: string;
	left?: string;
	headline?: string;
};

/**
 * Promo section components
 */
const Promo: React.SFC<{}> = () => {
	return (
		<>
			{/* Left side */}
			<div className={ styles.left }>

				{/* Headline */}
				<Headline h={1} variation="large" styles={ styles.headline }>
					<span>{ 'This october.' }</span>
					<span>{ 'New platform for telegram channels' }</span>
				</Headline>

				{/* Subscribe */}
				<SubscribeForm />
			</div>

			{/* Right side */}
			<img src={ images.promo_illustration } />

		</>
	);
};

export default Promo;
