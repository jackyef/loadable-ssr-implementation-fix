/**
 * Public page very top content block
 * right under the main header
 */
import React from 'react';

import { ContentBlock } from '@prostpost/elm';

import { toSignUp } from '../';
import { GetStarted } from 'app/components';

import {
	StyledContent,
	StyledHeading,
	StyledParagraph,
	StyledTop
} from './_styled';

export const Promo: React.FC = () => (
	<ContentBlock bg="white_100">
		<StyledContent>
			<StyledTop>
				<StyledHeading h={ 1 }>
					{ 'Tools to manage your Telegram channels and posts with ease.' }
				</StyledHeading>
				<StyledParagraph size={ 18 } color="black_50">
					{ 'For bloggers, teams and admins of channels. Create new content faster and grow the audience.' }
				</StyledParagraph>
			</StyledTop>
			<GetStarted onClick={ toSignUp } />
		</StyledContent>
	</ContentBlock>
);
