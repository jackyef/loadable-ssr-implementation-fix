/**
 * Header and footer current navigation
 * configurations
 */
import _ from 'lodash';

import { authenticated } from '@tg/ui/utils';
import { resources } from '@tg/ui/res';

import { TypeNav } from '../../../tg-ui/src/components/Public/index';
import { routes } from './routes';

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
			scroll: 'features'
		},
		{
			title: 'Pricing',
			style: 'nav',
			scroll: 'pricing'
		},
		{
			title: 'Bonuses',
			style: 'nav',
			scroll: 'roadmap'
		}
	],
	right: [
		{
			title: 'Join our channel',
			style: 'nav',
			// TODO: Change to imported icon from @tg/ui
			icon: resources.icon_join_channel
		},
		{
			title: authenticated() ? 'Channels' : 'Sign in',
			style: 'general_small',
			nav: !authenticated(),
			url: authenticated() ? null : routes.auth.signin,
			onClick: !authenticated() ? _.noop : () => window.location.assign(routes.poster)
		}
	]
};

export const authHeaderNav = (path: 'up' | 'in'): HeaderNav => {
	return {
		right: [
			{
				title: path === 'up' ? 'Sign in' : 'Create account',
				style: 'general_small',
				nav: true,
				url: path === 'up' ? routes.auth.signin : routes.auth.signup
			}
		]
	};
};

/**
 * Footer navigation
 */
export const footerNav: TypeNav = [
	{
		title: 'Join our channel',
		style: 'nav_footer',
		// TODO: Change to imported icon from @tg/ui
		icon: resources.icon_join_channel
	},
	{
		title: 'Contact us',
		style: 'nav_footer'
	}
];
