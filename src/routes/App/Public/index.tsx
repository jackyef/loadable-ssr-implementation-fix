/**
 * Public application part container (home, F.A.Q. etc)
 */
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { renderRoutes } from '@scc/utils';
import { Btn, Scrollbars } from '@tg/ui';

// Components
import { Header, Nav, Logo, NavItem } from '../../../components';

// Styles
import importedStyles from './Public.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	nav?: string;
};

type Props = {
	route: RouteConfig & { render?: any };
};

/**
 * Public container
 */
const Container: React.FC<Props> = ({ route }) => {
	return (
		<Scrollbars styles={{ wrapper: styles.self }}>

			{/* Header */}
			<Header>
				<Logo/>

				{/* Page navigation */}
				<Nav className={ styles.nav }>
					<NavItem>
						<Btn title="Organise" style={{ main: 'nav' }} />
					</NavItem>
					<NavItem>
						<Btn title="Create" style={{ main: 'nav' }} />
					</NavItem>
					<NavItem>
						<Btn title="Analize" style={{ main: 'nav' }} />
					</NavItem>
					<NavItem>
						<Btn title="Pricing" style={{ main: 'nav' }} />
					</NavItem>
				</Nav>

				{/* Sign in/up (logout) */}
				<Nav>
					<NavItem>
						<Btn title="Sign In" style={{ main: 'nav' }} />
					</NavItem>
					<NavItem>
						<Btn title="Get Started" style={{ main: 'general', size: 'mid' }} />
					</NavItem>
				</Nav>
			</Header>

			{/* Content */}
			{ renderRoutes(route.routes) }

			{/* Footer */}
			{/* Footer component here */}

		</Scrollbars>
	);
};

export default Container;
