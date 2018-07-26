/**
 * Footer block component
 */
import React from 'react';

import { canUseDOM } from '@scc/scc-ui-kit';

import { Logo, Btn } from '@tg/ui';

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
					<li><Btn title="Poster" type="nav" hint="footer" /></li>
					<li><Btn title="Market" type="nav" hint="footer" /></li>
					<li><Btn title="Pricing" type="nav" hint="footer" /></li>
					<li><Btn title="FAQ" type="nav" hint="footer" /></li>
				</ul>

				{/* Terms */}
				<ul>
					<li><Btn title="Terms of Use" type="nav" hint="footer" /></li>
					<li><Btn title="Privacy Policy" type="nav" hint="footer" /></li>
				</ul>

				{/* Language */}
				<ul>
					<li>
						<Btn title="English" icon={`${ staticImagesPath }/icon_lang.svg`}
							type="nav" hint="footer" nav={ false }
						/>
					</li>
				</ul>
			</nav>
		</footer>
	);
};

Footer.defaultProps = defaultProps;

export default Footer;
