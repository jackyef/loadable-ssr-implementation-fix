/**
 * Public page very top content block
 * right under the main header
 */
import React from 'react';

import { Headline } from '@tg/ui';

// Styles
import importedStyles from './Promo.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	left?: string;
	right?: string;
};

/**
 * Component
 */
export const Promo: React.FC<{}> = () => (
	<div className={ styles.self }>

		{/* Left */}
		<div className={ styles.left }>
			<Headline h={1} title="Tools to manage your Telegram channels and posts with ease." />
		</div>

		{/* Right */}
		<div className={ styles.right } />
	</div>
);
