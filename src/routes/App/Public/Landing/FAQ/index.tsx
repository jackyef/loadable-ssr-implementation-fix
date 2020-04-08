/**
 * @module FAQ
 */
import _ from 'lodash';
import React from 'react';

import { Heading } from '@tg/elm';

import { ContentBlock } from 'app/components';
import { FAQItem, Props as FAQItemProps } from './FAQItem';

// Styles
import importedStyles from './FAQ.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

const data: FAQItemProps[] = [
	{
		question: 'What are my payment options - credit card and/or invoicing?',
		answer: 'We support Visa, Mastercard and American Express. For yearly plans' +
			'for 6 users or more we offer invoiced billing. Click here to speak to the team.'
	},
	{
		question: 'Can I transfer projects from my personal account to my team?',
		answer: 'Of course! It works just like the storage limit on your phone or computer.' +
			'If you delete something, you will free up space for more.'
	},
	{
		question: 'How is pricing calculated for the Team plan?',
		answer: 'If you upgrade your workspace to the Team plan, you will be charged a fee per member ' +
			'($10 monthly or $96 yearly). For example, if you pay per month and have 5 members, you will ' +
			'be charged $50 each month.\n Guests are free of charge – but they can only access individual ' +
			'pages they are invited to. In other words, guests won\'t be able to see all the team pages under ' +
			'the "Workspace" section in the left sidebar.'
	},
	{
		question: 'How is the payment being processed?',
		answer: 'We use Stripe to process your payment. It\'s the same payment provider used in products such ' +
			'as Twitter, Pinterest, and Lyft. We do not handle your credit card information directly.'
	}
];

/**
 * Component
 */
export const FAQ: React.FC<{}> = () => (
	<ContentBlock className={ styles.self }>

		{/* Title */}
		<Heading h={ 2 } color="white_100" title="Frequently asked questions" />

		{/* List of questions */}
		<ul>
			{
				_.map(data, (item, index) => (
					<FAQItem key={ index } { ...item } />
				))
			}
		</ul>
	</ContentBlock>
);
