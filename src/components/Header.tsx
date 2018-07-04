/**
 * Public header
 */
import React from 'react';

import { Btn, BtnNav, canUseDOM } from '@scc/scc-ui-kit';

import { Logo } from '@tg/ui';
import { logout } from '@tg/ui/utils';
import { authenticated } from '@tg/ui/utils';

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
								<li><BtnNav external url={ routes.poster } title="Poster" styles={{ theme: modules.btn.nav }} /></li>
								<li><BtnNav external url={ routes.market } title="Market" styles={{ theme: modules.btn.nav }} /></li>
							</ul>
						)
					}

					{/* Public pages */}
					<ul>
						{
						auth
							? null
							: (<>
								<li><BtnNav url={ routes.pricing } title="Pricing" styles={{ theme: modules.btn.nav }} /></li>
								<li><BtnNav url={ routes.faq } title="FAQ" styles={{ theme: modules.btn.nav }} /></li>
							</>)
						}

						{/* Login or Create account */}
						{
							authenticated()
								? (
									<li>
										<Btn title="Log out" styles={{ theme: modules.btn.nav_stroked }}
											onClick={ () => logout(axiosInstance, history, api.auth.logout, routes.index) }
										/>
									</li>
								)
								: (
									<li><BtnNav url={ auth === 'in' ? routes.auth.signup : routes.auth.signin }
										title={ auth === 'in' ? 'Create account' : 'Log in' }
										styles={{ theme: modules.btn.nav_stroked }} />
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
