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
			title: 'About'
		},
		{
			title: 'Pricing'
		},
		{
			title: 'Bonuses'
		}
	],
	right: [
		{
			title: 'Join our channel'
		}
	]
};

/**
 * Footer navigation
 */
export const footerNav: TypeNav[] = [];
