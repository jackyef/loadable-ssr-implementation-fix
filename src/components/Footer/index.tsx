/**
 * @module Footer
 */
import React from 'react';

import { Logo, Button } from '@tg/elm';

import { ContentBlock } from '../ContentBlock';
import { routes } from '../../config';

// Styles
import importedStyles from './Footer.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	top?: string;
	bottom?: string;
	logo?: string;
};

/**
 * Component
 */
export const Footer: React.FC<{}> = () => (
	<ContentBlock wrapper="footer" className={ styles.self }>
		<Logo textOnly className={ styles.logo } />
		<span>&copy; {'2019 prostpost'}</span>
		<div>
			<Button variant="nav" size="small" title="Contact Us" />
			<Button variant="nav" size="small" title="Join our Channel" />
			<Button variant="nav" size="small" onClick={ () => routes.pp } title="Terms and Privacy" />
		</div>
	</ContentBlock>
);
