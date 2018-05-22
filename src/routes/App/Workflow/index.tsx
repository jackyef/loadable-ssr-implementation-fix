import _ from 'lodash';
import React from 'react';
import { RouteConfig } from 'react-router-config';

import Header from '../../../components/Workflow/Header';
import Sidebar from '../../../components/Workflow/Sidebar';
import SidebarBtn from '../../../components/Workflow/SidebarBtn';

import { logout } from '../../';
import renderRoutes from '../../../helpers/utils/renderRoutes';

import { styles } from '../../../styles/routes/Workflow/Workflow';
import { styles as sidebarBtnStyles } from '../../../styles/components/Workflow/SidebarBtn';

type Props = {
	route: RouteConfig & { render?: any };
};

// Test channels
const __testChannels = ['vc', 'tech', 'sport'];

/**
 * Workflow container
 */
const Container: React.SFC<Props> = ({ route }) => {
	return (
		<>
			{/* Sidebar */}
			<Sidebar>

				{/* User */}
				<SidebarBtn text="Max" tooltipText="Settings" styles={ sidebarBtnStyles.solid } />

				{/* Channels */}
				<ul className={ styles.sidebar.channels }>
					{
						_.map(__testChannels, (ava: any, index: number) => (
							<li key={ index }>
								<SidebarBtn text={ ava } styles={ sidebarBtnStyles.with_shadow } />
							</li>
							)
						)
					}

					{/* Add new channel */}
					<li>
						<SidebarBtn icon="fas fa-plus" tooltipText="Add new channel" styles={ sidebarBtnStyles.bordered } />
					</li>
				</ul>

				{/* Bottom set of buttons */}
				<ul className={ styles.sidebar.bottom }>

					{/* Help */}
					<li>
						<SidebarBtn icon="fas fa-question" tooltipText="Support" styles={ sidebarBtnStyles.icon } />
					</li>

					{/* Logout */}
					<li>
						<SidebarBtn icon="fas fa-sign-out-alt" tooltipText="Sign out" styles={ sidebarBtnStyles.icon }
							onClick={ logout }
						/>
					</li>
				</ul>
			</Sidebar>

			{/* Content */}
			<section className={ styles.content.self }>

				{/* Header (current channel short info) */}
				<Header name="Design & Productivity" views={ 3650 } members={ 13758 } />

				{/* Inner account routes */}
				<main>
					{ renderRoutes(route.routes) }
				</main>
			</section>
		</>
	);
};

export default Container;
