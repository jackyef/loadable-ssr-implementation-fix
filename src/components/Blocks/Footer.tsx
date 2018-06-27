/**
 * Footer block component
 */
import React from 'react';

import { canUseDOM, BtnNav, Btn } from '@scc/scc-ui-kit';

import Logo from '../Elements/Logo';

import { routes } from '../../config';
import { history } from '../../routes';

import { styles } from '../../styles/components/Blocks/Footer';
import { styles as stylesNav } from '../../styles/components/Elements/Nav';
import { styles as stylesNavBtn } from '../../styles/components/Elements/BtnNavFooter';

export const Footer: React.SFC<{}> = () => {
	return (
		<footer className={ styles.self }>
			<Logo to={ routes.home } history={ canUseDOM() && history } />

			{/* Navigation */}
			<nav className={ stylesNav.self }>

				{/* Main */}
				<ul>
					<li><BtnNav title="Poster" styles={ stylesNavBtn } /></li>
					<li><BtnNav title="Market" styles={ stylesNavBtn } /></li>
					<li><BtnNav title="Pricing" styles={ stylesNavBtn } /></li>
					<li><BtnNav title="FAQ" styles={ stylesNavBtn } /></li>
				</ul>

				{/* Terms */}
				<ul>
					<li><BtnNav title="Terms of Use" styles={ stylesNavBtn } /></li>
					<li><BtnNav title="Privacy Policy" styles={ stylesNavBtn } /></li>
				</ul>

				{/* Language */}
				<ul>
					<li><Btn title="English" icon="/static/public/images/icon_lang.svg" styles={ stylesNavBtn } /></li>
				</ul>
			</nav>
		</footer>
	);
};

export default Footer;
