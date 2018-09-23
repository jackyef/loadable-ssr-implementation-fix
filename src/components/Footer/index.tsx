/**
 * Footer component
 * @module Footer
 */
import React from 'react';

import NavList, { Nav } from '../NavList';

const styles: Styles = require('./Footer.module.less');

type Styles = {
	self?: string;
};

type Props = {
	nav: Nav;
};

/**
 * Component
 */
const Footer: React.SFC<Props> = ({ nav }) => {
	return (
		<footer className={ styles.self }>

			{/* Left */}
			<div>
				<span>{ '2018' }</span>
			</div>

			{/* Right */}
			<NavList items={ nav } />

		</footer>
	);
};

export default Footer;
