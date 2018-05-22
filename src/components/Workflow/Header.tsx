/**
 * Account container Header component
 */
import React from 'react';
import { Link } from 'react-router-dom';

import { BtnNav, Icon } from '@scc/scc-ui-kit';

import { routes } from '../../config';
import { shortNumber } from '../../helpers/utils/strings';

import { styles } from '../../styles/components/Workflow/Header';

type Props = {

	/**
	 * Channel full name
	 */
	name?: string;

	/**
	 * Quantity of members joined
	 */
	members?: number;

	/**
	 * Average views of a post
	 */
	views?: number;
};

/**
 * Header component
 */
const Header: React.SFC<Props> = ({ name, members, views }) => (
	<header className={ styles.self }>

		{/* Ava with a name */}
		<figure>
			<div />
			<Link to={ routes.workflow.summary }>{ name }</Link>
		</figure>

		{/* Stats */}
		<ul>
			{/* Members */}
			<li className={ styles.views.green }>
				<Link to={ routes.workflow.stats }>
					<Icon icon="fas fa-chevron-up" />
					{ shortNumber(members) }<span>{ 'members' }</span>
				</Link>
			</li>

			{/* Views */}
			<li>
				<Link to={ routes.workflow.stats }>
					{ shortNumber(views) }<span>{ 'views per post' }</span>
				</Link>
			</li>
		</ul>

		{/* New post */}
		<BtnNav url={ routes.workflow.post.create } title="Create new post"
			icon="fas fa-plus" styles={ styles.new_post_btn }
		/>

	</header>
);

export default Header;
