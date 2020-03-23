/**
 * @module FAQItem
 */
import React from 'react';

import { Wrapper } from '@tg/wrapper';
import { Headline } from '@tg/elm';

// Styles
import importedStyles from './FAQItem.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

export type Props = {
	wrapper?: string;
	question?: string;
	answer?: string;
};

const defaultProps: Partial<Props> = {
	wrapper: 'li'
};

/**
 * Component
 */
export const FAQItem: React.FC<Props> = ({ wrapper, question, answer }) => (
	<Wrapper wrapper={ wrapper } styles={ styles.self }>
		<Headline h={ 3 } title={ question } />
		<p>{ answer }</p>
	</Wrapper>
);

FAQItem.defaultProps = defaultProps;
