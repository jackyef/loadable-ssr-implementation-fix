/**
 * Feature item for Features list
 * @module BlogTypes
 */
import React from 'react';

import { Headline } from '@tg/elm';
import { resources } from '@tg/resources';

import importedStyles from './Feature.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

export type Props = {
	image?: string;
	hint?: string;
	title?: string;
	desc?: string;
};

const defaultProps: Partial<Props> = {
	image: resources.bg_no_image
};

export const Feature: React.FC<Props> = ({ image, hint, title, desc }) => (
	<li className={ styles.self }>

		{/* Image */}
		<div>
			<img src={ image } />
		</div>

		{/* Content */}
		<span>{ hint }</span>
		<Headline h={ 3 } title={ title } />
		<p>{ desc }</p>
	</li>
);

Feature.defaultProps = defaultProps;
