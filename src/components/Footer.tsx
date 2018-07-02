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
			<nav className={ modules.stylesNav.self }>

				{/* Main */}
				<ul>
					<li><BtnNav title="Poster" styles={ modules.stylesBtnNavFooter } /></li>
					<li><BtnNav title="Market" styles={ modules.stylesBtnNavFooter } /></li>
					<li><BtnNav title="Pricing" styles={ modules.stylesBtnNavFooter } /></li>
					<li><BtnNav title="FAQ" styles={ modules.stylesBtnNavFooter } /></li>
				</ul>

				{/* Terms */}
				<ul>
					<li><BtnNav title="Terms of Use" styles={ modules.stylesBtnNavFooter } /></li>
					<li><BtnNav title="Privacy Policy" styles={ modules.stylesBtnNavFooter } /></li>
				</ul>

				{/* Language */}
				<ul>
					<li><Btn title="English" icon={`${ staticImagesPath }/icon_lang.svg`} styles={ modules.stylesBtnNavFooter } /></li>
				</ul>
			</nav>
		</footer>
	);
};

Footer.defaultProps = defaultProps;

export default Footer;
