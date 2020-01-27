/**
 * @module Footer
 */
import React from 'react';

import { Btn, Logo } from '@tg/elm';

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
		<Logo className={ styles.logo } />
		<span>&copy; {'2019 prostpost'}</span>
		<div>
			<Btn style={ { main: 'nav' } } title="Contact Us" />
			<Btn style={ { main: 'nav' } } title="Join our Channel" />
			<Btn style={ { main: 'nav' } } url={ routes.pp } title="Terms and Privacy" />
		</div>
	</ContentBlock>
);
