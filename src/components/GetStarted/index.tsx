/**
 * Subscribe/login mini form with input field & one button
 * @module GetStarted
 */
import React from 'react';

import { FormRoot, StoreForm, StoreFormAPI } from '@scc/form';
import { Btn, FieldInput } from '@tg/ui';

import { IconArrowReverseV2 } from '@tg/ui/dist/resources';

import importedStyles from './GetStarted.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

type Props = {
	className?: string;
};

/**
 * Form
 */
const storeFormAPI = new StoreFormAPI();
const storeForm = new StoreForm('formGetStarted', {}, storeFormAPI);

const defaultProps: Partial<Props> = {
	className: ''
};

export const GetStarted: React.FC<Props> = ({ className }) => (
	<FormRoot wrapper="form" inject={ storeForm } styles={`${ styles.self } ${ className }`}>
		<FieldInput placeholder="Your email address" kind="big" />
		<Btn title="Get started" icon={ <IconArrowReverseV2 /> } iconPos="right"
			style={{ main: 'general', size: 'big' }}
		/>
	</FormRoot>
);

GetStarted.defaultProps = defaultProps;
