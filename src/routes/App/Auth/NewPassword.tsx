/**
 * Authentication process the very first route (Sign up)
 */
import React from 'react';
import { Helmet } from 'react-helmet';

import { FormRoot, StoreForm, StoreFormAPI } from '@scc/form';
import { canUseDOM } from '@scc/utils';

import { Btn, FieldInput, Headline } from '@tg/ui';
import { service as authService } from '@tg/api-proxy-auth';

import { validators } from '../../../utils';
import { routes } from '../../../config';

import { NotifyBox, awakeNotification } from './utils/notification';

// Styles
import { Styles } from './';
import importedStyles from './Auth.module.less';
const styles: Styles = importedStyles;

// Form store
const apiFormStore = new StoreFormAPI(authService.axiosInstance);
const formStore = new StoreForm('auth', null, apiFormStore);

/**
 * Create new password
 */
const NewPassword: React.FC<{}> = () => {
	return (
		<>
			<Helmet>
				<title>{ 'Create new password' }</title>
			</Helmet>

			{/* Form */}
			<FormRoot wrapper="form" name="newPassword" inject={ formStore }
				styles={ styles.form }
				onSubmitSucceed={ () => canUseDOM() && window.location.assign(routes.poster) }
				onSubmitFailed={ awakeNotification }
			>
				{/* Title */}
				<Headline title="Create password" h={2} variation="public" />

				{/* Notifications area */}
				<NotifyBox />

				{/* Password */}
				<FieldInput name="password" placeholder="password" type="password"
					errPos="right"
					label="New password"
					validators={[
						v => validators.password.match(v, formStore.getFieldValue('re_password')),
						validators.password.required
					]}
				/>

				{/* Repeat password */}
				<FieldInput name="re_password" placeholder="repeat" type="password"
					errPos="right"
					label="Repeat password"
					validators={[
						v => validators.password.match(v, formStore.getFieldValue('password')),
						validators.password.required
					]}
				/>

				{/* Submit */}
				<Btn style={{ main: 'general' }} title="Create account"
					onClick={() => formStore.submit()}
				/>

			</FormRoot>
		</>
	);
};

export default NewPassword;
