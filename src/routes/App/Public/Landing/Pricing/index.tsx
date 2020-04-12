/**
 * @module Pricing
 */
import React, { Ref } from 'react';

import {
	Heading,
	Text,
	Flex,
	Paragraph,
	ContentBlock,
	PricingCard,
	PricingCardProps
} from '@tg/elm';

import {
	IconPen,
	IconChannel,
	IconMember
} from '@tg/resources';

import { StyledList } from './_styled';

type Props = {
	ref?: Ref<any>;
};

const data: PricingCardProps[] = [

	// Free
	{
		icon: null,
		title: 'Free Starter',
		desc: 'Learn, explore and create',
		price: 0,
		submitTitle: 'Free',
		features: [
			{ icon: <IconChannel />, iconScale: 0.8, title: '1 Channel' },
			{ icon: <IconPen />, title: '20 Posts/month' },
			{ icon: <IconMember />, title: '1 Team member' }
		]
	},

	// Main
	{
		icon: null,
		title: 'Pro Blogger',
		desc: 'For more complex projects',
		price: 5,
		submitTitle: 'Join Pro',
		features: [
			{ icon: <IconChannel />, iconScale: 0.8, title: 'Up to 3 channels' },
			{ icon: <IconPen />, title: 'Unlimited posts' },
			{ icon: <IconMember />, title: 'Up to 3 members' }
		]
	},

	// Custom
	{
		icon: null,
		title: 'Custom',
		desc: 'Custom plan that suits your needs',
		submitTitle: 'Contact us',
		variant: 'dark'
	}
];

/**
 * Component
 */
export const Pricing: React.FC<Props> = React.forwardRef((props, ref) => (
	<ContentBlock ref={ ref } bg="blue_150">
		<Flex dir="column" justify="space-between" align="center" mt={ 8 }>

			{/* Title */}
			<Text size={ 12 } color="yellow_100">{ 'Pricing' }</Text>
			<Heading h={ 2 } pb={ 6 } title="Simple pricing" color="white_100" />

			{/* Offers (cards) */}
			<StyledList>
				<PricingCard { ...data[0] } />
				<PricingCard sale { ...data[1] } />
				<PricingCard { ...data[2] }>
					<div>
						<Heading h={ 2 } color="white_100" title="Let's chat" />
						<Paragraph size={ 18 } color="blue_20_opaque">
							{ 'Unlimited channels, posts and team members and everything from Pro Plan' }
						</Paragraph>
					</div>
				</PricingCard>
			</StyledList>

		</Flex>
	</ContentBlock>
));
