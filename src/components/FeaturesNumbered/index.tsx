/**
 * List (primarily features) with title (optional), short desc (optional)
 * and numbered list of features
 * @module FeaturesNumbered
 */
import _ from 'lodash';
import React from 'react';

import { Headline } from '@tg/ui';

import { Feature } from '../../types';

const styles: Styles = require('./FeaturesNumbered.module.less');

type Styles = {
	self?: string;
	list?: string;
};

type Props = {
	title?: string;
	desc?: string;
	features?: Feature[];
};

const defaultProps: Partial<Props> = {
	title: null,
	desc: null,
	features: null
};

/**
 * Component
 */
const FeaturesNumbered: React.SFC<Props> = ({ title, desc, features }) => {
	return _.isEmpty(features) ? null : (
		<div className={ styles.self }>

			{/* Title and description */}
			<Headline h={2} title={ title } color="on-primary" />
			<p>{ desc }</p>

			{/* Features */}
			<ul className={ styles.list }>
				{
					_.map(features, (feature, index) => (
						<li key={ index }>
							<span>{ index < 10 ? `0${ index + 1 }` : index + 1 }</span>
							<Headline h={3} title={ feature.title } color="on-primary" />
							<p>{ feature.desc }</p>
						</li>
					))
				}
			</ul>

		</div>
	);
};

FeaturesNumbered.defaultProps = defaultProps;

export default FeaturesNumbered;
