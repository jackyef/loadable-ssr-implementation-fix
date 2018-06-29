/**
 * Public header
 */
import React from 'react';

import { BtnNav, canUseDOM } from '@scc/scc-ui-kit';

import Logo from '../Elements/Logo';

import { routes } from '../../config';
import { history } from '../../routes';

import { styles } from '../../styles/components/Blocks/Header';
import { styles as stylesNav } from '../../styles/components/Elements/Nav';
import { styles as stylesNavBtn } from '../../styles/components/Elements/BtnNav';
import { styles as stylesNavBtnStroked } from '../../styles/components/Elements/BtnNavStroked';

/**
 * Public header
 */
const Header: React.SFC<{}> = () => {
	return (
		<header className={ styles.self }>
			<div>
				<Logo to={ routes.home } history={ canUseDOM() && history } />

				{/* Navigation */}
				<nav className={ stylesNav.self }>

					{/* Products */}
					<ul>
						<li><BtnNav external url={ routes.poster } title="Poster" styles={ stylesNavBtn } /></li>
						<li><BtnNav external url={ routes.market } title="Market" styles={ stylesNavBtn } /></li>
					</ul>

					{/* Public pages */}
					<ul>
						<li><BtnNav url={ routes.pricing } title="Pricing" styles={ stylesNavBtn } /></li>
						<li><BtnNav url={ routes.faq } title="FAQ" styles={ stylesNavBtn } /></li>
						<li><BtnNav url={ routes.auth.signin } title="Log In" styles={ stylesNavBtnStroked } /></li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
