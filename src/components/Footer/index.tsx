/**
 * @module Footer
 */
import React from 'react';

import { Btn } from '@tg/ui';

import { Logo } from '../Logo';
import { ContentBlock } from '../ContentBlock';
import { routes } from '../../config';

// Styles
import importedStyles from './Footer.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	top?: string;
	bottom?: string;
};

/**
 * Component
 */
export const Footer: React.FC<{}> = () => (
	<ContentBlock className={styles.self}>
		<Logo />
		<span>&copy; {'2019 Telelama LTD'}</span>
		<div>
			<Btn style={{ main: 'nav' }} title="Contact Us" />
			<Btn style={{ main: 'nav' }} title="Join our Channel" />
			<Btn style={{ main: 'nav' }} url={ routes.pp } title="Terms and Privacy" />
		</div>
	</ContentBlock>
);
