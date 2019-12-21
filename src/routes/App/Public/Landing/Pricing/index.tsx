/**
 * @module Pricing
 */
import React, { Ref } from 'react';

import { Headline } from '@tg/ui';
import {
	IconOfferFree,
	IconOfferBlogger,
	IconOfferCustom,
	IconPen,
	IconChannel,
	IconMember
} from '@tg/ui/dist/resources';

import { PricingCard, Props as PricingCardProps } from './PricingCard';
import { ContentBlock } from '../../../../../components';

// Styles
import importedStyles from './Pricing.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	card?: string;
	dark_card?: string;
};

type Props = {
	ref?: Ref<any>;
};

const data: PricingCardProps[] = [

	// Free
	{
		icon: <IconOfferFree />,
		title: 'Free Starter',
		desc: 'Learn, explore and create',
		price: 0,
		submitTitle: 'Start for Free',
		className: styles.card,
		features: [
			{ icon: <IconChannel />, title: '1 Channel' },
			{ icon: <IconPen />, title: '20 Posts/month' },
			{ icon: <IconMember />, title: '1 Team member' }
		]
	},

	// Main
	{
		icon: <IconOfferBlogger />,
		title: 'Pro Blogger',
		desc: 'For more complex projects',
		price: 5,
		submitTitle: 'Join Pro',
		className: styles.card,
		features: [
			{ icon: <IconChannel />, title: 'Up to 3 channels' },
			{ icon: <IconPen />, title: 'Unlimited posts' },
			{ icon: <IconMember />, title: 'Up to 3 members' }
		]
	},

	// Custom
	{
		icon: <IconOfferCustom />,
		title: 'Custom',
		desc: 'Custom plan for your needs',
		submitTitle: 'Contact us',
		className: `${styles.card} ${styles.dark_card}`
	}
];

/**
 * Component
 */
export const Pricing: React.FC<Props> = React.forwardRef((props, ref) => (
	<ContentBlock ref={ref} className={styles.self}>

		{/* Title */}
		<Headline h={2} variation="public" title="Simple pricing" />

		{/* Offers (cards) */}
		<ul>
			<PricingCard { ...data[0] } />
			<PricingCard { ...data[1] } />
			<PricingCard { ...data[2] }>
				<div>
					<Headline h={2} variation="public" title="Let's chat" />
					<p>{'Unlimited channels, posts and team members and everything from Pro Plan'}</p>
				</div>
			</PricingCard>
		</ul>

	</ContentBlock>
));
