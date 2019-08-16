/**
 * Authentication process the very first route (Sign up)
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { FormRoot, IStoreForm } from '@scc/form';
import { canUseDOM } from '@scc/utils';

import { Btn, FieldInput, Headline } from '@tg/ui';
import { IconGoogleV2 } from '@tg/ui/dist/resources';

import { validators } from '../../../utils';
import { routes } from '../../../config';

// Styles
import { Styles } from './';
import importedStyles from './Auth.module.less';
const styles: Styles = importedStyles;

type Props = {
	// Passed from Loadable
	store: IStoreForm;
};

/**
 * Sign up authentication route container
 */
const SignUp: React.FC<Props> = ({ store }) => {
	return (
	<>
		<Helmet>
			<title>{ 'Create account - Email & Socials' }</title>
		</Helmet>

		{/* Form */}
		<FormRoot wrapper="form" name="signup" inject={ store }
			styles={ styles.form }
			onSubmitSucceed={ () => canUseDOM() && window.location.assign(routes.poster) }
		>
			{/* Title */}
			<Headline title="Join" h={1} variation="public" />

			{/* Email*/}
			<FieldInput name="email" placeholder="Email"
				validators={[
					validators.email.valid,
					validators.email.required
				]}
			/>

			{/* Password */}
			<FieldInput name="password" placeholder="Password" type="password"
				validators={[
					v => validators.password.match(v, store.getFieldValue('re_password')),
					validators.password.required
				]}
			/>

			{/* Repeat password */}
			<FieldInput name="re_password" placeholder="Repeat password" type="password"
				validators={[
					v => validators.password.match(v, store.getFieldValue('password')),
					validators.password.required
				]}
			/>

			{/* Submit */}
			<Btn style={{ main: 'general' }} title="Create account"
				onClick={() => store.submit()}
			/>

			{/* Divider */}
			<span>{ 'or' }</span>

			{/* Google */}
			<Btn style={{ main: 'google' }} title="Join with Google"
				icon={<IconGoogleV2 />}
			/>

		</FormRoot>
	</>
	);
};

export default SignUp;
