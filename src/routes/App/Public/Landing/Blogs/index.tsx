/**
 * Blog types block. What blog can use the tool and how
 * @module Blog
 */
import _ from 'lodash';
import React from 'react';

import { Flex } from '@tg/elm';

import { StyledHeading, StyledList } from './_styled';
import { ContentBlock, Feature, FeatureProps } from 'app/components';

/**
 * Blog types data
 */
const featuresData: FeatureProps[] = [
	{
		// TODO: Assign image
		// image: '',
		title: 'First step blogger',
		hint: '450 members',
		desc: 'Concentrate on content for your followers. Keep all you drafts and immediately turn them into posts.'
	},
	{
		// TODO: Assign image
		// image: '',
		title: 'Opinion leader',
		hint: '3k members',
		desc: 'Schedule your posts to create more engagement with your audience. Control advert posts in channel.'
	},
	{
		// TODO: Assign image
		// image: '',
		title: 'Modern Media',
		hint: '24k members',
		desc: 'Don\'t you have more members than local news? Collaboration tools for creation and scheduling.'
	}
];

/**
 * Component
 */
export const Blogs: React.FC<{}> = () => (
	<ContentBlock bg="blue_10">
		<Flex dir="column" align="center">
			<StyledHeading h={ 2 } title="For beginners, grown and large channels" />
			<StyledList>
				{ _.map(featuresData, data => <Feature key={ data.title } { ...data } />) }
			</StyledList>
		</Flex>
	</ContentBlock>
);
