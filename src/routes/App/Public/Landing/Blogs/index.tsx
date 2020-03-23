/**
 * Blog types block. What blog can use the tool and how
 * @module Blog
 */
import _ from 'lodash';
import React from 'react';

import { Headline } from '@tg/elm';

import { ContentBlock, Feature, FeatureProps } from '../../../../../components';

import importedStyles from './Blogs.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	features?: string;
};

/**
 * Blog types data
 */
const featuresData: FeatureProps[] = [
	{
		// image: '',
		title: 'First step blogger',
		hint: '450 members',
		desc: 'Concentrate on content for your followers. Keep all you drafts and immediately turn them into posts.'
	},
	{
		// image: '',
		title: 'Opinion leader',
		hint: '3k members',
		desc: 'Schedule your posts to create more engagement with your audience. Control advert posts in channel.'
	},
	{
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
	<ContentBlock className={ styles.self }>

		{/* Content block title */}
		<Headline h={ 2 } title="For beginners, grown and large channels" />

		{/* Features list */}
		<ul className={ styles.features }>
			{ _.map(featuresData, data => <Feature key={ data.title } { ...data } />) }
		</ul>

	</ContentBlock>
);
