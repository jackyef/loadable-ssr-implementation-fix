/**
 * Public header
 */
import React from 'react';

import { canUseDOM } from '@scc/scc-ui-kit';

import { Logo, Btn } from '@tg/ui';
import { logout, authenticated } from '@tg/ui/utils';

import { routes, axiosInstance, api } from '../config';
import { history } from '../routes';

import modules from '@tg/ui/lessmodules';
import { styles } from '../styles/components/Header';

type Props = {
	auth?: 'in' | 'up';
};

const defaultProps: Partial<Props> = {
	auth: null
};

/**
 * Public header
 */
const Header: React.SFC<Props> = ({ auth }) => {
	return (
		<header className={ styles.self }>
			<div>
				<Logo to={ routes.home } history={ canUseDOM() && history } />

				{/* Navigation */}
				<nav className={ modules.nav.self }>

					{/* Products */}
					{
					auth
						? <ul/>
						: (
							<ul>
								<li><Btn type="nav" external url={ routes.poster } title="Poster" /></li>
								<li><Btn type="nav" external url={ routes.market } title="Market" /></li>
							</ul>
						)
					}

					{/* Public pages */}
					<ul>
						{
						auth
							? null
							: (<>
								<li><Btn type="nav" url={ routes.pricing } title="Pricing" /></li>
								<li><Btn type="nav" url={ routes.faq } title="FAQ" /></li>
							</>)
						}

						{/* Login or Create account */}
						{
							authenticated()
								? (
									<li>
										<Btn type="nav" hint="stroked" title="Log out"
											onClick={ () => logout(axiosInstance, history, api.auth.logout, routes.index) }
										/>
									</li>
								)
								: (
									<li>
										<Btn type="nav" hint="stroked" title={ auth === 'in' ? 'Create account' : 'Log in' }
											url={ auth === 'in' ? routes.auth.signup : routes.auth.signin }
										/>
									</li>
								)
						}
					</ul>
				</nav>
			</div>
		</header>
	);
};

Header.defaultProps = defaultProps;

export default Header;
