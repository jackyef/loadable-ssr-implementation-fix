/**
 * Display on feature as a card with background
 * that contains: icon, title & description.
 * Likely multiple of cards are combined in a grid.
 * @module FeatureCard
 */
import React from 'react';

import { Wrapper } from '@tg/wrapper';
import { Icon, Headline } from '@tg/elm';

// Styles
import importedStyles from './FeatureCard.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

export type Props = {

	/**
	 * Outer container tag
	 * li - for list/grid of cards
	 * div - for a single card
	 */
	wrapper?: string;

	/**
	 * Icon
	 */
	icon?: React.ReactElement | string;

	/**
	 * Title
	 */
	title?: string;

	/**
	 * Description
	 */
	desc?: string;

	/**
	 * Custom style
	 * e.g. to assign card's bg
	 */
	className?: string;
};

const defaultProps: Partial<Props> = {
	wrapper: 'li',
	className: ''
};

/**
 * Component
 */
export const FeatureCard: React.FC<Props> = ({ wrapper, icon, title, desc, className }) => (
	<Wrapper wrapper={ wrapper } styles={ `${ styles.self } ${ className }` }>
		<Icon icon={ icon } />
		<Headline h={ 3 } variation="public" title={ title } />
		<p>{desc}</p>
	</Wrapper>
);

FeatureCard.defaultProps = defaultProps;
