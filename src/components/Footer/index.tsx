/**
 * @module Footer
 */
import React from 'react';

import { Btn } from '@tg/ui';

import { Logo } from '../Logo';
import { ContentBlock } from '../ContentBlock';

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

		{/* Top */}
		<div className={styles.top}>
			<Logo />
			<div>
				<Btn style={{ main: 'nav' }} title="Join Channel" />
				<Btn style={{ main: 'nav' }} title="Contact Us" />
				<Btn style={{ main: 'nav' }} title="Privacy Policy" />
				<Btn style={{ main: 'nav' }} title="Terms of Use" />
			</div>
		</div>

		{/* Bottom */}
		<div className={styles.bottom}>
			<span/>
			<span>&copy; {'All rights reserved 2019'}</span>
		</div>

	</ContentBlock>
);
