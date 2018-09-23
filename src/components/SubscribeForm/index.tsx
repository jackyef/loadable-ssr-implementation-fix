/**
 * Component
 * @module SubscribeForm
 */
import React from 'react';

import { FormRoot } from '@scc/ui-kit';
import { FieldInput } from '@scc/ui-kit/addons';
import { Btn } from '@tg/ui';

import { subscribeStore } from '../../stores';

import images from '../../../resources';

const styles: Styles = require('./SubscribeForm.module.less');

type Styles = {
	self?: string;
	self__reversed?: string;
	self__normal?: string;

	field?: string;
	field__reversed?: string;
};

type Props = {
	inverted?: boolean;
};

const defaultProps: Partial<Props> = {
	inverted: false
};

/**
 * Component
 */
const SubscribeForm: React.SFC<Props> = ({ inverted }) => {
	return (
		<FormRoot wrapper="form" inject={ subscribeStore }
			styles={`${ styles.self } ${ inverted ? styles.self__reversed : styles.self__normal }`}
		>

			{/* Title */}
			<span>{ 'Get your early access' }<img src={ images.icon_key } /></span>

			{/* Form */}
			<div>
				<FieldInput placeholder="Enter your email" styles={{ custom: inverted ? styles.field__reversed : styles.field }} />
				<Btn style="general_small" title="Subscribe" />
			</div>

			{/* Rules */}
			<ul>
				<li>{ 'Free 30-day trial' }</li>
				<li>{ 'No credit card required' }</li>
			</ul>

		</FormRoot>
	);
};

SubscribeForm.defaultProps = defaultProps;

export default SubscribeForm;
