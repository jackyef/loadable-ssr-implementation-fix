/**
 * Public page very top content block
 * right under the main header
 */
import React from 'react';

import { Headline } from '@tg/ui';

import { GetStarted, ContentBlock } from '../../../../../components';

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
	<ContentBlock className={ styles.self }>

			{/* Left */}
			<div className={ styles.left }>
				<Headline h={1} variation="public" title="Tools to manage your Telegram channels and posts with ease." />
				<GetStarted />
			</div>

			{/* Right */}
			<div className={ styles.right }>
				<p>{`
					For blogers, teams and admins
					of channels. Create new content
					faster and grow the audience.
				`}</p>
			</div>

	</ContentBlock>
);
