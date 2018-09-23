/**
 * Price card component to display a short
 * description of tariff
 * @module PriceCard
 */
import React from 'react';

import { Wrapper, Icon } from '@scc/ui-kit';

import { Offer } from '../../types';

const styles: Styles = require('./PriceCard.module.less');

type Styles = {
	self?: string;
	desc?: string;
	limit?: string;
	price?: string;
};

type Props = Offer & {
	wrapper?: string;
};

const defaultProps: Partial<Props> = {
	wrapper: 'li'
};

/**
 * Price card component
 */
const PriceCard: React.SFC<Props> = ({ wrapper, icon, title, desc, limit, price }) => {
	return (!title ? null :
		<Wrapper wrapper={ wrapper } styles={ styles.self }>

			{/* Name & desc */}
			<div className={ styles.desc }>
				<Icon icon={ icon } />
				<div>
					<span>{ title }</span>
					<span>{ desc }</span>
				</div>
			</div>

			{/* Limit */}
			{ limit ? <span className={ styles.limit }>{ limit }</span> : null }

			{/* Price */}
			{
				!price ? null : (
					<div className={ styles.price }>
						<span>{ price.currency }{ price.value }</span>
						<span>{' / '}{ price.per }</span>
					</div>
				)
			}
		</Wrapper>
	);
};

PriceCard.defaultProps = defaultProps;

export default PriceCard;
