/**
 * Sign up process initial route (socials or email)
 */
import _ from 'lodash';
import React from 'react';
import { Helmet } from 'react-helmet';

import { FormRoot, BtnNav, Input, Submit } from '@scc/scc-ui-kit';
import { required, email } from '@scc/scc-ui-kit/validators';

import { history } from '../../../';
import { authFormStore, notifyStore } from '../../../../stores';
import { api, routes, axiosInstance } from '../../../../config';

import { SIGNUP_FAILED_ON_EMAIL } from '../../../../config/messages';

import { styles as containerStyles } from '../../../../styles/routes/Auth/Auth';

/**
 * Sign up initial route
 */
export default class Email extends React.Component<{}> {

	protected currentCountryData: any = {
		countriesList: [],
		country: { value: null, disp: null },
		code: null
	};

	componentDidMount() {

		// Get location
		axiosInstance.get(api.external.location)
			.then(response => this.currentCountryData = {
				code: response.data.calling_code,
				country: {
					value: response.data.country_code,
					disp: response.data.country_name
				}
			})
			.catch(err => console.log(_.get(err, 'response.data.message', err)))
		;

		// Get countries list
		axiosInstance.get(api.external.countries)
			.then(response => this.currentCountryData.countriesList = response.data)
			.catch(err => console.log(_.get(err, 'response.data.message', err)))
		;
	}

	render() {
		return (
			<>
				<Helmet>
					<title>{ 'Sign Up - Email & Socials' }</title>
				</Helmet>

				{/* Sign up form */}
				<FormRoot wrapper="form" name="signup" inject={ authFormStore }
					onSubmitFailed={
						err => {
							notifyStore.awake({
								name: 'signUpFailed',
								header: SIGNUP_FAILED_ON_EMAIL.text,
								text: err[0],
								state: 'error',
								delay: 5000
							});
						}
					}

					onSubmitSucceed={
						data => {
							history ? history.push({
								pathname: routes.auth.signup.phone,
								state: { ...data, ...this.currentCountryData }
							}) : null;
						}
					}
				>
					{/* Title */}
					<h1>{ 'Sign Up' }</h1>

					{/* Socials */}
					<BtnNav external title="Continue with Google" icon="fab fa-google"
						url={ api.auth.google }
						styles={{ theme: containerStyles.socials_google }}
					/>

					{/* Divider */}
					<hr />

					{/* Email */}
					<Input name="email" placeholder="Email" icon="fas fa-envelope"
						validators={[required, email]}
					/>

					{/* Password */}
					<Input name="password" type="password"
						icon="fas fa-lock" placeholder="Password"
						validators={[ required ]}
					/>

					{/* Repeat password */}
					<Input name="repeat_password" type="password"
						icon="fas fa-lock" placeholder="Repeat password"
						validators={[ required ]}
					/>

					{/* Submit */}
					<Submit form={ authFormStore } title="Continue with email"
						url={ api.auth.register }
						styles={{ theme: containerStyles.btn }}
					/>

				</FormRoot>
			</>
		);
	}
}
