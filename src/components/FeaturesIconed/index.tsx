/**
 * Horizontal features list with
 * iconed items
 * @module Features iconed
 */
import _ from 'lodash';
import React from 'react';

import { Icon } from '@scc/ui-kit';
import { Headline } from '@tg/ui';

import { Feature } from '../../types';

const styles: Styles = require('./FeaturesIconed.module.less');

type Styles = {
	self?: string;
	feature?: string;
};

type Props = {
	features?: Feature[];
};

const defaultProps: Partial<Props> = {
	features: []
};

/**
 * Features list
 */
const FeaturesIconed: React.SFC<Props> = ({ features }) => {
	return (
		<ul className={ styles.self }>
			{
				_.map(features, (feature, index) => (
					<li key={ index } className={ styles.feature }>
						<Icon icon={ feature.icon } />
						<Headline h={3} variation="upper" title={ feature.title } color="on-primary" />
						<p>{ feature.desc }</p>
					</li>
				))
			}
		</ul>
	);
};

FeaturesIconed.defaultProps = defaultProps;

export default FeaturesIconed;
