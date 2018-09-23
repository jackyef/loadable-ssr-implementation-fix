/**
 * Header and footer current navigation
 * configurations
 */
import { TypeNav } from '../components';

type HeaderNav = {
	left?: TypeNav;
	right?: TypeNav;
};

/**
 * Header left and right navigation
 */
export const headerNav: HeaderNav = {
	left: [
		{
			title: 'About',
			style: 'nav',
		},
		{
			title: 'Pricing',
			style: 'nav'
		},
		{
			title: 'Bonuses',
			style: 'nav'
		}
	],
	right: [
		{
			title: 'Join our channel',
			style: 'nav',
			// TODO: Change to imported icon from @tg/ui
			icon: '/static/public/images/icon_join_channel.svg'
		}
	]
};

/**
 * Footer navigation
 */
export const footerNav: TypeNav = [
	{
		title: 'Join our channel',
		style: 'nav_footer',
		// TODO: Change to imported icon from @tg/ui
		icon: '/static/public/images/icon_join_channel.svg'
	},
	{
		title: 'Contact us',
		style: 'nav_footer'
	}
];
