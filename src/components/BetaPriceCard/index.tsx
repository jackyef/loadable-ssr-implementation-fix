/**
 * Custom price card for beta period
 * @module BetaPriceCard
 */
import React from 'react';

import { Wrapper, Icon } from '@scc/ui-kit';
import { Btn } from '@tg/ui';

import { Offer } from '../../types';

const cardStyles: Styles = require('../PriceCard/PriceCard.module.less');
const customStyles: Styles = require('./BetaPriceCard.module.less');

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
 * Beta price card component
 */
const BetaPriceCard: React.SFC<Props> = ({ wrapper, icon, title, desc }) => {
	return (!title ? null :
			<Wrapper wrapper={ wrapper } styles={`${ cardStyles.self } ${ customStyles.self }`}>

				{/* Name & desc */}
				<div className={ cardStyles.desc }>
					<Icon icon={ icon } />
					<div>
						<span>{ title }</span>
						<span>{ desc }</span>
					</div>
				</div>

				{/* Free early access */}
				<Btn title="Free early access" style="general_small" />

			</Wrapper>
	);
};

BetaPriceCard.defaultProps = defaultProps;

export default BetaPriceCard;
