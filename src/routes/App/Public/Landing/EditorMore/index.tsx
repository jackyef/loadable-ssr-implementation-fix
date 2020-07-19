/**
 * Additional Editor's features displayed
 * as a grid of boxes
 *
 * @module EditorMore
 */
import _ from 'lodash';
import React from 'react';
import { Eye, DollarSign } from 'react-feather';

import styled, { CSS, useTheme } from '@prostpost/styled';
import {
	MEDIA,
	mediaQueries,
	flex,
	ContentBlock,
	FeatureCard,
	FeatureCardProps
} from '@prostpost/elm';

const featuresData: FeatureCardProps[] = [
	{
		icon: DollarSign,
		title: 'Advertising tags',
		desc: 'Unleash your creativity, plan projects from all angles and create',
		variant: 'light'
	},
	{
		icon: Eye,
		title: 'Bot preview',
		desc: 'Unleash your creativity, plan projects from all angles and create',
		variant: 'dark'
	}
];

const StyledWrapper = styled.ul`
	/* stylelint-disable value-keyword-case */

	${ flex({
		justify: 'center',
		width: '100%'
	}) }

	${ mediaQueries[MEDIA.MOBILE] } {
		flex-direction: column;
	}
`;

const StyledFeatureCard = styled(FeatureCard)`

	&:first-child { margin-right: ${ ({ theme }): CSS => theme.space[3] }; }
	&:last-child { margin-left: ${ ({ theme }): CSS => theme.space[3] }; }

	${ mediaQueries[MEDIA.MOBILE] } {
		width: 100%;
		margin: ${ ({ theme }): CSS => theme.space[2] } 0 !important;
	}
`;

export const EditorMore: React.FC = () => {

	const theme = useTheme();

	return (
		<ContentBlock y={ theme.space[8] }>
			<StyledWrapper>
				{
					_.map(featuresData, (data, index) => (
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						<StyledFeatureCard key={ index } { ...data } />
					))
				}
			</StyledWrapper>
		</ContentBlock>
	);
};
