/**
 * Show Feed mechanics and possibilities
 * @module Feed
 */
import _ from 'lodash';
import moment from 'moment';
import React, { useState, Ref } from 'react';

import { uuid } from '@tg/utils';
import { Headline } from '@tg/elm';
import { StoreMedia } from '@tg/media';
import { ContextStores, CLIENT_DATEFORMAT, ListPostsPreview } from '@tg/app';
import { DataPost } from '@tg/api-proxy-drafts';
import { createAxiosInstance, authRefresher } from '@tg/api-proxy-auth';
import { resources, IconArchive, IconPen, IconTime } from '@tg/resources';

import { ContentBlock, FeaturesSwitcher, BlockTextHint } from '../../../../../components';
import { Feature } from '../../../../../components/FeaturesSwitcher';

import importedStyles from './Feed.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	left?: string;
	right?: string;
	preview_selected?: string;
	block_hint?: string;
};

/**
 * Empty posts store
 */
const storePosts = new DataPost();

/**
 * Media store
 */
const onRefreshFailed = (): void => localStorage.removeItem('id_token');
const axiosInstance = createAxiosInstance({}, { ...authRefresher, onRefreshFailed });
const media = new StoreMedia('', axiosInstance);

type Props = {
	active?: number;
	ref?: Ref<any>;
};

/**
 * Features content
 */
const featuresData: Feature[] = [
	{
		icon: <IconTime />,
		title: 'Scheduling',
		desc: 'Show what posts on what time will be broadcasted to your channels'
	},
	{
		icon: <IconPen />,
		title: 'Edit post content',
		desc: 'Be sure when post hit the Telegram. And of source you can edit your post form app too'
	},
	{
		icon: <IconArchive />,
		title: 'History',
		desc: 'Access history and old posts'
	}
];

/**
 * Test posts data
 */
const postsData = [
	{
		text: `
			After Yuan Shikai was installed as the second
			leader Provisional Great President of the Republic of China...
		`,
		ad: true,
		reactions: true,
		uuid: uuid(4),
		tags: ['travel', 'history'],
		publish_at: moment().add(2, 'days').add(3, 'h').format(CLIENT_DATEFORMAT),
		channel: { ava_small: resources.icon_user }
	},
	{
		text: `
			The official cause of death for both was
			“ligature neck compression,” meaning strangulation by a cord...
		`,
		views: 1300,
		uuid: uuid(4),
		tags: ['travel', 'history', 'longtruestory'],
		published_at: moment().subtract(1, 'days').subtract(6, 'h').format(CLIENT_DATEFORMAT),
		channel: { ava_small: resources.icon_user }
	},
	{
		text: `
			After Yuan Shikai was installed as the second
			leader Provisional Great President of the Republic of China...
		`,
		reactions: true,
		views: 2400,
		uuid: uuid(4),
		tags: ['travel', 'history'],
		published_at: moment().subtract(4, 'days').subtract(8, 'h').format(CLIENT_DATEFORMAT),
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
				<BlockTextHint text="Organize" />
				<Headline variation="public" h={ 2 }
					title="Organise posts and activities from all channels in one feed"
				/>
				<FeaturesSwitcher features={ featuresData } active={ active } onSwitch={ setActive } />
			</div>

			{/* Right part */}
			<ContextStores.Provider value={ { posts: storePosts, media } }>
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
