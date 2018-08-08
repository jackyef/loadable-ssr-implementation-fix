/**
 * Public header
 * @module PublicHeader
 */
import React from 'react';

import { Btn, PublicHeader as UIPublicHeader } from '@tg/ui';
import { logout, authenticated } from '@tg/ui/utils';
import { api } from '@tg/ui/config';

import { routes, axiosInstance } from '../config';
import { history } from '../routes';

type Props = {
	auth?: 'in' | 'up';
};

const defaultProps: Partial<Props> = {
	auth: null
};

/**
 * Public header
 */
const PublicHeader: React.SFC<Props> = ({ auth }) => {
	return (
		<UIPublicHeader to_home={ routes.home }>

			{/* Products */}
			{
				auth
					? <ul/>
					: (
						<ul>
							<li><Btn style="nav" external url={ routes.poster } title="Poster" /></li>
							<li><Btn style="nav" external url={ routes.market } title="Market" /></li>
						</ul>
					)
			}

			{/* Public pages */}
			<ul>
				{
					auth
						? null
						: (<>
							<li><Btn style="nav" url={ routes.pricing } title="Pricing" /></li>
							<li><Btn style="nav" url={ routes.faq } title="FAQ" /></li>
						</>)
				}

				{/* Login or Create account */}
				{
					authenticated()
						? (
							<li>
								<Btn style="nav_stroked" title="Log out"
									 onClick={ () => logout(axiosInstance, history, api.auth.logout, routes.index) }
								/>
							</li>
						)
						: (
							<li>
								<Btn style="nav_stroked" title={ auth === 'in' ? 'Create account' : 'Log in' }
									 url={ auth === 'in' ? routes.auth.signup : routes.auth.signin }
								/>
							</li>
						)
				}
			</ul>
		</UIPublicHeader>
	);
};

PublicHeader.defaultProps = defaultProps;

export default PublicHeader;
