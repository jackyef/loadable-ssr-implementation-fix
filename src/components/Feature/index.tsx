/**
 * Feature item for Features list
 * @module BlogTypes
 */
import React from 'react';

import { Ava, Heading, Text, Paragraph } from '@tg/elm';

import { StyledContainer } from './_styled';

export type Props = {
	image?: string;
	hint?: string;
	title?: string;
	desc?: string;
};

const defaultProps: Partial<Props> = {
	image: null
};

export const Feature: React.FC<Props> = ({ image, hint, title, desc }) => (
	<StyledContainer>
		<Ava size="big" ava={ image } />
		<Text mt={ 5 } size={ 13 } color="blue_30">{ hint }</Text>
		<Heading h={ 3 } title={ title } />
		<Paragraph centered size={ 18 } color="black_50">{ desc }</Paragraph>
	</StyledContainer>
);

Feature.defaultProps = defaultProps;
