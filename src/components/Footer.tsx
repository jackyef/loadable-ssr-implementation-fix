/**
 * Footer block component
 */
import React from 'react';

import { canUseDOM, BtnNav, Btn } from '@scc/scc-ui-kit';

import { Logo } from '@tg/ui';

import { routes, staticImagesPath } from '../config';
import { history } from '../routes';

import modules from '@tg/ui/lessmodules';
import { styles } from '../styles/components/Footer';

type Props = {
	auth?: boolean;
};

const defaultProps: Partial<Props> = {
	auth: false
};

export const Footer: React.SFC<Props> = ({ auth }) => {
	return (
		<footer className={ styles.self }>

			{/* Logo */}
			{
				auth
					? null
					: <Logo to={ routes.home } history={ canUseDOM() && history } />
			}

			{/* Navigation */}
			<nav className={ modules.nav.self }>

				{/* Main */}
				<ul>
					<li><BtnNav title="Poster" styles={{ theme: modules.btn.nav_footer }} /></li>
					<li><BtnNav title="Market" styles={{ theme: modules.btn.nav_footer }} /></li>
					<li><BtnNav title="Pricing" styles={{ theme: modules.btn.nav_footer }} /></li>
					<li><BtnNav title="FAQ" styles={{ theme: modules.btn.nav_footer }} /></li>
				</ul>

				{/* Terms */}
				<ul>
					<li><BtnNav title="Terms of Use" styles={ { theme: modules.btn.nav_footer } } /></li>
					<li><BtnNav title="Privacy Policy" styles={ { theme: modules.btn.nav_footer } } /></li>
				</ul>

				{/* Language */}
				<ul>
					<li>
						<Btn title="English" icon={`${ staticImagesPath }/icon_lang.svg`}
							styles={ { theme: modules.btn.nav_footer } }
						/>
					</li>
				</ul>
			</nav>
		</footer>
	);
};

Footer.defaultProps = defaultProps;

export default Footer;
