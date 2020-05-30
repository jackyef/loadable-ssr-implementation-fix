/**
 * Block at the bottom of the landing page
 * that repeat
 *
 * @module GetStarted
 */
import React from 'react';

import styled, { CSS } from '@tg/styled';
import { Heading, Paragraph, flex, mediaQueries, MEDIA, ContentBlock } from '@tg/elm';

import { toSignUp } from '../';
import { GetStarted as GetStartedForm } from 'app/components';

const StyledContainer = styled.div`
	/* stylelint-disable value-keyword-case */

	${ flex({
		dir: 'column',
		align: 'center'
	}) }

	padding: ${ ({ theme }): CSS => theme.space[7] } 0;

	${ mediaQueries[MEDIA.TABLET] } {
		padding: 0 0 ${ ({ theme }): CSS => theme.space[7] } 0;
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		padding-top: 0;
	}
`;

const StyledForm = styled(GetStartedForm)`
	justify-content: center;
`;

export const GetStarted: React.FC = () => (
	<ContentBlock>
		<StyledContainer>
			<Heading centered h={ 1 }>
				{'Ready to get started?'} <br/> {'Try it.'}
			</Heading>
			<Paragraph centered size={ 18 } color="black_50" mt={ 7 }>
				{ 'Join now and get 3 months of free management for all your channels.' }
			</Paragraph>
			<StyledForm onClick={ toSignUp } />
		</StyledContainer>
	</ContentBlock>
);
