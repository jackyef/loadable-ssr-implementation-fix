/**
 * Header and footer current navigation
 * configurations
 */
import _ from 'lodash';

import { canUseDOM, authenticated } from '@scc/utils';

import { IconJoinChannel } from '@tg/ui/resources';
import { TypeNav } from '@tg/ui';

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
			style: {main: 'nav'},
			scroll: 'features'
		},
		{
			title: 'Pricing',
			style: {main: 'nav'},
			scroll: 'pricing'
		},
		{
			title: 'Bonuses',
			style: {main: 'nav'},
			scroll: 'roadmap'
		}
	],
	right: [
		{
			title: 'Join our channel',
			style: {main: 'nav'},
			icon: IconJoinChannel
		},
		{
			title: authenticated() ? 'Channels' : 'Sign in',
			style: {main: 'general', size: 'small'},
			nav: !authenticated(),
			url: authenticated() ? null : routes.auth.signin,
			onClick: !authenticated() || !canUseDOM() ? _.noop : () => window.location.assign(routes.poster)
		}
	]
};

export const authHeaderNav = (path: 'up' | 'in'): HeaderNav => {
	return {
		right: [
			{
				title: path === 'up' ? 'Sign in' : 'Create account',
				style: { main: 'general', size: 'small' },
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
		style: {main: 'nav'},
		icon: IconJoinChannel
	},
	{
		title: 'Contact us',
		style: { main: 'nav' }
	}
];
