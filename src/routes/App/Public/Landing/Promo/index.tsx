/**
 * Public page very top content block
 * right under the main header
 */
import React from 'react';

import { Paragraph, Heading } from '@tg/elm';

import { toSignUp } from '../';
import { GetStarted, ContentBlock } from '../../../../../components';

// Styles
import importedStyles from './Promo.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	top?: string;
	bottom?: string;
};

/**
 * Component
 */
export const Promo: React.FC<{}> = () => (
	<ContentBlock className={ styles.self }>

			{/* Top */}
			<div className={ styles.top }>
				<Heading h={ 1 }>
					{ 'Tools to manage your Telegram channels and posts with ease.' }
				</Heading>
				<Paragraph size={ 18 } color="black_50">{`
					For bloggers, teams and admins
					of channels. Create new content
					faster and grow the audience.
				`}</Paragraph>
			</div>

			{/* Bottom */}
			<GetStarted onClick={ toSignUp } className={ styles.bottom } />

	</ContentBlock>
);
