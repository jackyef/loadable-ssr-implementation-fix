/**
 * Header navigation
 */
import React from 'react';

import { BtnNav } from '@scc/scc-ui-kit';

import { routes } from '../../config';

import { styles } from '../../styles/components/Elements/Nav';
import { styles as stylesBtn } from '../../styles/components/Elements/BtnNav';
import { styles as stylesBtnStroked } from '../../styles/components/Elements/BtnNavStroked';

/**
 * Header navigation
 */
const Nav: React.SFC<{}> = () => {
	return (
		<nav className={ styles.self }>

			{/* Products */}
			<ul>
				<li><BtnNav external url={ routes.poster } title="Poster" styles={ stylesBtn } /></li>
				<li><BtnNav external url={ routes.market } title="Market" styles={ stylesBtn } /></li>
			</ul>

			{/* Public pages */}
			<ul>
				<li><BtnNav url={ routes.pricing } title="Pricing" styles={ stylesBtn } /></li>
				<li><BtnNav url={ routes.faq } title="FAQ" styles={ stylesBtn } /></li>
				<li><BtnNav url={ routes.auth.signin } title="Log In" styles={ stylesBtn } /></li>
				<li><BtnNav url={ routes.auth.signup } title="Sign Up" styles={ stylesBtnStroked } /></li>
			</ul>
		</nav>
	);
};

export default Nav;
