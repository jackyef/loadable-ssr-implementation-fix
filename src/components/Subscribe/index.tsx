/**
 * Component
 * @module Subscribe
 */
import React from 'react';

import { Headline } from '@tg/ui';
import SubscribeForm from '../SubscribeForm';

const styles: Styles = require('./Subscribe.module.less');

type Styles = {
	self?: string;
	left?: string;
	right?: string;
};

type Props = {};

const defaultProps: Partial<Props> = {};

/**
 * Component
 */
const Subscribe: React.SFC<Props> = ({}) => {
	return (
		<div className={ styles.self }>

			{/* Text */}
			<div className={ styles.left }>
				<Headline h={2} color="black" title={ 'Ready to get \nstarted? Try it.' } />
				<p>{ 'Join now and get 3 months of free management for all your channels' }</p>
			</div>

			{/* Form */}
			<div className={ styles.right }>
				<SubscribeForm inverted />
			</div>
		</div>
	);
};

Subscribe.defaultProps = defaultProps;

export default Subscribe;
