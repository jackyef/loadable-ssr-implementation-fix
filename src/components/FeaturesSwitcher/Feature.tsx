import React from 'react';
import styled from 'styled-components';

import { Icon, Heading, Paragraph, MEDIA, mediaQueries, flex } from '@tg/elm';

export type Props = {

	/**
	 * Feature title
	 */
	title?: string;

	/**
	 * Feature description
	 */
	desc?: string;

	/**
	 * Feature icon
	 */
	icon?: JSX.Element;

	/**
	 * If it is active or not
	 */
	active?: boolean;

	/**
	 * On click
	 */
	onClick?: () => void;
};

const StyledContainer = styled.li<Props>`
	position: relative;

	width: 100%;
	padding: 25px 0;

	cursor: pointer;

	${ mediaQueries[MEDIA.NOT_DESKTOP] } {
		padding: 12px;
	}
`;

const StyledHeader = styled.header<Props>`
	/* stylelint-disable value-keyword-case */
	/* stylelint-disable selector-type-no-unknown */

	${ flex({
		align: 'center'
	}) }

	padding-left: 5px;
	margin-bottom: 8px;

	opacity: ${ ({ active }) => active ? 1 : 0.4 };
	transition: opacity ${ ({ theme }) => theme.animation.tt_tf };

	${ StyledContainer }:hover & {
		opacity: 1;
	}
`;

const StyledParagraph = styled(Paragraph)<Props>`
	opacity: ${ ({ active }) => active ? 1 : 0.5 };
	transition: opacity ${ ({ theme }) => theme.animation.tt_tf };

	${ StyledContainer }:hover & {
		opacity: 1;
	}
`;

export const Feature: React.FC<Props> = ({ title, onClick, icon, desc, active }) => {
	return (
		<StyledContainer key={ title } onClick={ onClick }>
			<StyledHeader active={ active }>
				<Icon mr={ 3 } scale={ 1.5 } icon={ icon } />
				<Heading h={ 4 } title={ title } />
			</StyledHeader>
			<StyledParagraph size={ 18 } color="black_50" active={ active }>
				{ desc }
			</StyledParagraph>
		</StyledContainer>
	);
};
