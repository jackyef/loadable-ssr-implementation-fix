/**
 * Public application part container (home, F.A.Q. etc)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { Btn, BtnNav } from '@scc/scc-ui-kit';

import Logo from '../../../components/Logo';
import { routes } from '../../../config';
import { authenticated, logout } from '../../';
import renderRoutes from '../../../helpers/utils/renderRoutes';

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
								<li><Btn title="Log out" onClick={ logout } /></li>
								<li><BtnNav title="Workflow" exact url={ routes.workflow.self } /></li>
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
