/**
 * Show Feed mechanics and possibilities
 *
 * @module Feed
 */
import React, { useState, Ref } from 'react';

import { Text, FeaturesSwitcher, FeaturesSwitcherProps } from '@prostpost/elm';
import { IconArchive, IconPen, IconTime } from '@prostpost/resources';

import {
	StyledContentBlock,
	StyledHeading,
	StyledWrapper
} from './_styled';

/**
 * Empty posts store and context
 */
// const storePosts = new DataPost();
// const ContextStores = React.createContext({ posts: storePosts });

type Props = {
	active?: number;
	ref?: Ref<HTMLElement>;
};

/**
 * Features content
 */
const featuresData: FeaturesSwitcherProps[] = [
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
// const postsData = [
// 	{
// 		text: `
// 			After Yuan Shikai was installed as the second
// 			leader Provisional Great President of the Republic of China...
// 		`,
// 		ad: true,
// 		reactions: true,
// 		uuid: uuid(4),
// 		tags: ['travel', 'history'],
// 		publish_at: moment().add(2, 'days').add(3, 'h').format(CLIENT_DATEFORMAT)
// 	},
// 	{
// 		text: `
// 			The official cause of death for both was
// 			“ligature neck compression,” meaning strangulation by a cord...
// 		`,
// 		views: 1300,
// 		uuid: uuid(4),
// 		tags: ['travel', 'history', 'longtruestory'],
// 		published_at: moment().subtract(1, 'days').subtract(6, 'h').format(CLIENT_DATEFORMAT)
// 	},
// 	{
// 		text: `
// 			After Yuan Shikai was installed as the second
// 			leader Provisional Great President of the Republic of China...
// 		`,
// 		reactions: true,
// 		views: 2400,
// 		uuid: uuid(4),
// 		tags: ['travel', 'history'],
// 		published_at: moment().subtract(4, 'days').subtract(8, 'h').format(CLIENT_DATEFORMAT),
// 		channel: { ava_small: resources.icon_user }
// 	}
// ];

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
		<StyledContentBlock ref={ ref } bg="blue_10">
			<StyledWrapper>
				<Text size={ 12 } color="blue_100">{ 'Organize' }</Text>
				<StyledHeading h={ 2 }
					title="Organise posts and activities from all channels in one feed"
				/>
				<FeaturesSwitcher features={ featuresData } active={ active } onSwitch={ setActive } />
			</StyledWrapper>
		</StyledContentBlock>
	);
});

Feed.defaultProps = defaultProps;
Feed.displayName = 'Feed';
