/**
 * Footer block component
 * @module PublicFooter
 */
import React from 'react';

import { Btn, PublicFooter as UIPublicFooter } from '@tg/ui';
const icons = require('@tg/ui/resources');

import { routes } from '../config';

/**
 * Public footer component
 */
const PublicFooter: React.SFC<{}> = () => {
	return (
		<UIPublicFooter to_home={ routes.home }>

			{/* Main */}
			<ul>
				<li><Btn title="Poster" style="nav_footer" /></li>
				<li><Btn title="Market" style="nav_footer" /></li>
				<li><Btn title="Pricing" style="nav_footer" /></li>
				<li><Btn title="FAQ" style="nav_footer" /></li>
			</ul>

			{/* Terms */}
			<ul>
				<li><Btn title="Terms of Use" style="nav_footer" /></li>
				<li><Btn title="Privacy Policy" style="nav_footer" /></li>
			</ul>

			{/* Language */}
			<ul>
				<li>
					<Btn title="English" icon={ icons.icon_lang }
						 style="nav_footer" nav={ false }
					/>
				</li>
			</ul>

		</UIPublicFooter>
	);
};

export default PublicFooter;
