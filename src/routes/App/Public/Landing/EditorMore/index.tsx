/**
 * Additional Editor's features displayed
 * as a grid of boxes
 * @module EditorMore
 */
import _ from 'lodash';
import React from 'react';
import styled, { useTheme } from 'styled-components';

import { MEDIA, mediaQueries, Theme, flex, ContentBlock, FeatureCard, FeatureCardProps } from '@tg/elm';
import { IconAd, IconEdit } from '@tg/resources';

const featuresData: FeatureCardProps[] = [
	{
		icon: <IconAd />,
		title: 'Advertising tags',
		desc: 'Unleash your creativity, plan projects from all angles and create',
		variant: 'light'
	},
	{
		icon: <IconEdit />,
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

	&:first-child { margin-right: ${ ({ theme }) => theme.space[3] }; }
	&:last-child { margin-left: ${ ({ theme }) => theme.space[3] }; }

	${ mediaQueries[MEDIA.MOBILE] } {
		width: 100%;
		margin: ${ ({ theme }) => theme.space[2] } 0 !important;
	}
`;

/**
 * Component
 */
export const EditorMore: React.FC<{}> = () => {

	const theme = useTheme() as Theme;

	return (
		<ContentBlock y={ theme.space[8] }>
			<StyledWrapper>
				{
					_.map(featuresData, (data, index) => (
						<StyledFeatureCard key={ index } { ...data } />
					))
				}
			</StyledWrapper>
		</ContentBlock>
	);
};
