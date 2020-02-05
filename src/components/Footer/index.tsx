/**
 * @module Footer
 */
import React from 'react';

import { Logo } from '@tg/elm';
import { Btn } from '@tg/app';

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
			<Btn style={ { main: 'nav', size: 'small' } } title="Contact Us" />
			<Btn style={ { main: 'nav', size: 'small' } } title="Join our Channel" />
			<Btn style={ { main: 'nav', size: 'small' } } url={ routes.pp } title="Terms and Privacy" />
		</div>
	</ContentBlock>
);
