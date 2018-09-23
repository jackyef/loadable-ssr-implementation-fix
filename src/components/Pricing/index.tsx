/**
 * Pricing grid public component
 * @module Pricing
 */
import _ from 'lodash';
import React from 'react';

import { Icon } from '@scc/ui-kit';
import { Headline } from '@tg/ui';

import PriceCard from '../PriceCard';
import { Offer } from '../../types';
import images from '../../../resources';

const styles: Styles = require('./Pricing.module.less');

type Styles = {
	self?: string;
	features?: string;
	offers?: string;
};

type Props = {
	children?: React.ReactNode;
	offers?: Offer[];
	features?: string[];
};

const defaultProps: Partial<Props> = {
	children: null,
	offers: [],
	features: []
};

/**
 * Component
 */
const Pricing: React.SFC<Props> = ({ children, offers, features }) => {
	return (
		<div className={ styles.self }>

			{/* Features */}
			<div className={ styles.features }>
				<Headline h={2} color="black" title="Simple pricing" />
				<p>{ 'You have one channel for free forever. And every next for\n$2 per month for channel.' }</p>
				<span>{ 'Every plan includes all features' }</span>

				{/* Features list */}
				<ul>
					{
						_.map(features, (feature, index) => (
							<li key={ index }>
								<Icon icon={ images.icon_mark } />
								<span>{ feature }</span>
							</li>
						))
					}
				</ul>
			</div>

			{/* Prices stack */}
			<ul className={ styles.offers }>

				{/* Custom offers */}
				{ children }

				{/* Regular pricing */}
				{
					_.map(offers, (offer, index) => (
						<PriceCard key={ index } { ...offer } />
					))
				}
			</ul>
		</div>
	);
};

Pricing.defaultProps = defaultProps;

export default Pricing;
