/**
 * Display on feature as a card with background
 * that contains: icon, title & description.
 * Likely multiple of cards are combined in a grid.
 * @module FeatureCard
 */
import React from 'react';
import styled from 'styled-components';
import { color } from 'styled-system';

import { Icon, Heading, Paragraph, flex } from '@tg/elm';

export type Props = {

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
	 * Variant
	 */
	variant?: 'dark' | 'light';

	/**
	 * Wrapper HTML tag
	 */
	as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;

	/**
	 * Custom style
	 * e.g. to assign card's bg
	 */
	className?: string;
};

const defaultProps: Partial<Props> = {
	as: 'li',
	className: '',
	variant: 'light'
};

const StyledWrapper = styled.li<Props>`
	/* stylelint-disable value-keyword-case */

	${ flex({
		dir: 'column'
	}) }

	padding: 50px 40px 30px 40px;

	${ color }

	border-radius: ${ ({ theme }) => theme.radii.small };
`;

const StyledIcon = styled(Icon)`
	width: ${ ({ theme }) => theme.space[7] };
	height: ${ ({ theme }) => theme.space[7] };
	margin-bottom: ${ ({ theme }) => theme.space[3] };
`;

/**
 * Component
 */
export const FeatureCard: React.FC<Props> = ({ as, icon, title, desc, variant, className }) => {

	// Content color
	const color = variant === 'dark' ? 'white_100' : 'black_80';

	// Render
	return (
		<StyledWrapper as={ as }
			bg={ variant === 'dark' ? 'blue_150' : 'yellow_100' }
			className={ className }
		>
			<StyledIcon icon={ icon } color={ color } />
			<Heading h={ 3 } title={ title } color={ color } />
			<Paragraph size={ 18 } color={ color }>
				{ desc }
			</Paragraph>
		</StyledWrapper>
	);
};

FeatureCard.defaultProps = defaultProps;
