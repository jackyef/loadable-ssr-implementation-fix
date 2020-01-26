/**
 * Show Feed mechanics and possibilities
 * @module Feed
 */
import _ from 'lodash';
import moment from 'moment';
import React, { useState, Ref } from 'react';

import { uuid } from '@scc/utils';
import { Headline } from '@tg/elm';
import { ListPostsPreview } from '@tg/blocks';
import { ContextStores } from '@tg/config';
import { DataPost } from '@tg/api-proxy-drafts';
import { resources } from '@tg/resources';

import { ContentBlock, FeaturesSwitcher } from '../../../../../components';

import importedStyles from './Feed.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	left?: string;
	right?: string;
	preview_selected?: string;
};

/**
 * Empty posts store
 */
const storePosts = new DataPost();

type Props = {
	active?: number;
	ref?: Ref<any>;
};

/**
 * Features content
 */
const featuresData = [
	'Show what posts on what time will be broadcasted to your channels.',
	'Be sure when post hit the Telegram. And of source you can edit your post form app too.',
	'Access history and old posts.'
];

/**
 * Test posts data
 */
const postsData = [
	{
		text: `After Yuan Shikai was installed as the second leader Provisional Great President of the Republic of China...`,
		ad: true,
		reactions: true,
		uuid: uuid(4),
		tags: ['travel', 'history'],
		publish_at: moment().add(2, 'days').add(3, 'h').format('DD MMM YYYY [at] HH:mm'),
		channel: { ava_small: resources.icon_user }
	},
	{
		text: `The official cause of death for both was “ligature neck compression,” meaning strangulation by a cord...`,
		views: 1300,
		uuid: uuid(4),
		tags: ['travel', 'history', 'longtruestory'],
		published_at: moment().subtract(1, 'days').subtract(6, 'h').format('DD MMM YYYY [at] HH:mm'),
		channel: { ava_small: resources.icon_user }
	},
	{
		text: `After Yuan Shikai was installed as the second leader Provisional Great President of the Republic of China...`,
		reactions: true,
		views: 2400,
		uuid: uuid(4),
		tags: ['travel', 'history'],
		published_at: moment().subtract(4, 'days').subtract(8, 'h').format('DD MMM YYYY [at] HH:mm'),
		channel: { ava_small: resources.icon_user },
		// TODO: Change to custom reactions
		likes: 302,
		dislikes: 11
	}
];

const defaultProps: Partial<Props> = {
	active: 1
};

/**
 * Component
 */
export const Feed: React.FC<Props> = React.forwardRef(({ active: _active }, ref) => {

	// Active feature
	const [active, setActive] = useState<number>(_active);

	// Render
	return (
		<ContentBlock ref={ ref } className={ styles.self }>

			{/* Left part */}
			<div className={ styles.left }>
				<Headline variation="public" h={2} title="Organise posts and activities from all channels in one feed" />
				<FeaturesSwitcher features={ featuresData } active={ active } onSwitch={ setActive } />
			</div>

			{/* Right part */}
			<ContextStores.Provider value={{ posts: storePosts  }}>
				<ul className={ styles.right }>
					{
						_.map(postsData, (data, index) => (
							<ListPostsPreview key={ index } wrapper="li" post={ data }
								onClick={ () => setActive(index + 1) }
								showEditTooltip={ index === 1 }
								className={ active === (index + 1) ? styles.preview_selected : '' }
							/>
						))
					}
				</ul>
			</ContextStores.Provider>

		</ContentBlock>
	);
});

Feed.defaultProps = defaultProps;
