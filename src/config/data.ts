import { Feature, Offer } from '../types';

import images from '../../resources';

/**
 * First features set with icons
 */
export const dataIconedFeatures: Feature[] = [
	{
		icon: images.icon_feature_write,
		title: 'Write and schedule publications',
		desc: 'Distribute the posts on the days of the week, and the TelePulse will tell you the optimal time of publication.'
	},
	{
		icon: images.icon_feature_stats,
		title: 'Analyse channels and posts statistics',
		desc: 'Watch for the growth of subscribers and the effectiveness of publications on one interface screen.'
	},
	{
		icon: images.icon_feature_ad,
		title: 'Control advertising in channels',
		desc: 'Share channels with companies and businesses you regularly work with – like clients, vendors, ' +
			'and partners – to bring all the right people'
	}
];

/**
 * Second features list
 * MANAGING AND SCHEDULING POSTS
 */
export const dataManagingFeatures: Feature[] = [
	{
		title: 'Schedule time and date',
		desc: 'No notifications required! Auto Publish is available for'
	},
	{
		title: 'Create and sort tags',
		desc: 'No notifications required! Auto Publish is available for'
	},
	{
		title: 'Channels in one place',
		desc: 'No notifications required! Auto Publish is available for'
	},
	{
		title: 'Work with advertisement',
		desc: 'No notifications required! Auto Publish is available for'
	},
	{
		title: 'Reaction buttons',
		desc: 'No notifications required! Auto Publish is available for'
	}
];

/**
 * Creating posts features list
 */
export const dataPostsFeatures: Feature[] = [
	{
		title: 'Write and edit drafts',
		desc: 'No notifications required! Auto Publish is available for '
	},
	{
		title: 'Your own templates',
		desc: 'No notifications required! Auto Publish is available for '
	}
];

/**
 * Team work features list
 */
export const dataTeamFeatures: Feature[] = [
	{
		title: 'All drafts in one place',
		desc: 'No notifications required! Auto Publish is available for '
	},
	{
		title: 'See scheduled posts line',
		desc: 'No notifications required! Auto Publish is available for '
	}
];

/**
 * Pricing offers
 */
export const dataPricing: Offer[] = [
	{
		icon: images.icon_offer_blogger,
		title: 'Blogger',
		desc: 'Ideal for personal blogs and thematic channels',
		limit: 'Up to 3',
		price: {
			value: 3,
			currency: '$',
			per: 'mo.'
		}
	},
	{
		icon: images.icon_offer_admin,
		title: 'Administrator',
		desc: 'A good plan if you earn by posting ads',
		limit: 'Up to 5',
		price: {
			value: 5,
			currency: '$',
			per: 'mo.'
		}
	},
	{
		icon: images.icon_offer_master,
		title: 'Channel master',
		desc: 'Ideal for personal blogs and thematic channels',
		limit: 'Unlimited',
		price: {
			value: 7,
			currency: '$',
			per: 'mo.'
		}
	}
];

/**
 * Features listed in pricing
 */
export const dataPricingFeatures = [
	'Reaction buttons',
	'Pictures and gallery',
	'Preview',
	'Text quality',
	'Drafts',
	'Templates'
];

/**
 * Custom price card for beta period
 */
export const dataBetaPriceCard = {
	icon: images.icon_offer_beta,
	title: '30 days free trial',
	desc: 'Extended trial for beta period. Try and give feedback.'
};