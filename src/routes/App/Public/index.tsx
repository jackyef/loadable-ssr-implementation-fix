/**
 * Public application part container (home, F.A.Q. etc)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { Btn, BtnNav } from '@scc/scc-ui-kit';
import { renderRoutes, logout, authenticated } from '@tg/ui-kit/utils';
import { Logo } from '@tg/ui-kit';

import { routes, api, axiosInstance } from '../../../config';
import { history } from '../..';

import { styles } from '../../../styles/routes/Public/Public';

type Props = {
	route: RouteConfig & { render?: any };
};

/**
 * Public container
 */
const Container: React.SFC<Props> = ({ route }) => {
	return (<>

		{/* Header */}
		<header className={ styles.header }>

			{/* Logo */}
			<Logo />

			{/* Navigation */}
			<nav className={ styles.nav }>
				<ul>
					{
						!authenticated()
							? (<>
								<li><BtnNav title="Sign In" exact url={ routes.auth.signin } /></li>
								<li><BtnNav title="Sign Up" exact url={ routes.auth.signup.self } /></li>
							</>)
							: (<>
								<li><Btn title="Log out" onClick={ () => logout(axiosInstance, history, api.auth.logout) } /></li>
								<li><BtnNav title="Workflow" exact url={ '' } /></li>
							</>)
					}
				</ul>
			</nav>
		</header>

		{/* Content */}
		<main className={ styles.content }>
			{ renderRoutes(route.routes) }
		</main>
	</>);
};

export default Container;
