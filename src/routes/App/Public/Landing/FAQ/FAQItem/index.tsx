/**
 * @module FAQItem
 */
import React from 'react';

import { Heading, Paragraph, styled } from '@tg/elm';

export type Props = {
	question?: string;
	answer?: string;
};

const StyledContainer = styled.li`
	padding-bottom: 20px;
	margin-bottom: 30px;
`;

export const FAQItem: React.FC<Props> = ({ question, answer }) => (
	<StyledContainer>
		<Heading h={ 3 } mb={ 3 } title={ question } color="white_100" />
		<Paragraph size={ 18 } color="blue_20_opaque">{ answer }</Paragraph>
	</StyledContainer>
);
