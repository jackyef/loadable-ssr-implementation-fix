/**
 * Additional Editor's features displayed
 * as a grid of boxes
 * @module EditorMore
 */
import _ from 'lodash';
import React from 'react';

import { IconAd, IconEdit } from '@tg/ui/dist/resources';

import { ContentBlock, FeatureCard, FeatureCardProps } from '../../../../../components';

// Styles
import importedStyles from './EditorMore.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	card_ad?: string;
	card_bot_preview?: string;
};

const featuresData: FeatureCardProps[] = [
	{
		icon: <IconAd />,
		title: 'Advertising tags',
		desc: 'Unleash your creativity, plan projects from all angles and create',
		className: styles.card_ad
	},
	{
		icon: <IconEdit />,
		title: 'Bot preview',
		desc: 'Unleash your creativity, plan projects from all angles and create',
		className: styles.card_bot_preview
	}
];

/**
 * Component
 */
export const EditorMore: React.FC<{}> = () => (
	<ContentBlock className={styles.self}>
		<ul>
			{ _.map(featuresData, (data, index) => <FeatureCard key={index} {...data} />) }
		</ul>
	</ContentBlock>
);
