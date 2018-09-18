/**
 * Top section of the Landing page
 * @module Promo
 */
import React from 'react';

import { FormRoot } from '@scc/ui-kit';
import { FieldInput } from '@scc/ui-kit/addons';

import { Headline, Btn } from '@tg/ui';

import { subscribeStore } from '../../stores';
import ContentSection from '../ContentSection';

import images from '../../../resources';
const styles: Styles = require('./Promo.module.less');

type Styles = {
	self?: string;
	left?: string;
	headline?: string;
	subscribe?: string;
	field?: string;
};

/**
 * Promo section components
 */
const Promo: React.SFC<{}> = () => {
	return (
		<ContentSection styles={ styles.self }>

			{/* Left side */}
			<div className={ styles.left }>

				{/* Headline */}
				<Headline h={1} variation="large" styles={ styles.headline }>
					<span>{ 'This october.' }</span>
					<span>{ 'New platform for telegram channels' }</span>
				</Headline>

				{/* Subscribe */}
				<FormRoot wrapper="form" inject={ subscribeStore } styles={ styles.subscribe }>

					{/* Title */}
					<span>{ 'Get your early access' }<img src={ images.icon_key } /></span>

					{/* Form */}
					<div>
						<FieldInput placeholder="Enter your email" styles={{ custom: styles.field }} />
						<Btn style="general_small" title="Subscribe" />
					</div>

					{/* Rules */}
					<ul>
						<li>{ 'Free 30-day trial' }</li>
						<li>{ 'No credit card required' }</li>
					</ul>

				</FormRoot>

			</div>

			{/* Right side */}
			<img src={ images.promo_illustration } />

		</ContentSection>
	);
};

export default Promo;
