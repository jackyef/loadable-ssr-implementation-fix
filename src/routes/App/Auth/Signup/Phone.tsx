/**
 * Continue sign up process with phone number
 */
import _ from 'lodash';
import React from 'react';
import { Helmet } from 'react-helmet';
import { RouteProps } from 'react-router';

import { FormRoot, Dropdown, Input, Submit } from '@scc/scc-ui-kit';
import { required, length } from '@scc/scc-ui-kit/validators';
import { canUseDOM } from '@scc/scc-ui-kit/utils';

import { integersOnly } from '../../../../helpers/masks';

import { history } from '../../../';
import { api, axiosInstance, routes } from '../../../../config';
import { authFormStore } from '../../../../stores';

import {
	SECURE_CODE_HAS_BEEN_SENT,
	CANT_ACTIVATE_NEW_USER_AFTER_SIGNUP
} from '../../../../config/messages';

import { styles as containerStyles } from '../../../../styles/routes/Auth/Auth';

type Props = RouteProps;

type State = {
	userConfirmed?: boolean;
	currentCountryData?: any;
	codeSent?: boolean;
	codeHash?: string;
	msg?: {
		text?: string;
		status?: string;
	};
};

/**
 * Sign up Phone route
 */
export default class Phone extends React.Component<Props, State> {

	state: Partial<State> = {
		userConfirmed: false,
		currentCountryData: {}
	};

	protected userId: string = null;

	componentWillMount() {

		// If not id redirect to sing up (email)
		this.userId = _.get(this.props.location.state, 'id', null);

		// Check user
		axiosInstance.get(api.auth.checkUser, { params: this.userId ? { id: this.userId } : {} })
			.then(res => this.setState({ userConfirmed: true }))
			.catch(err => { history && history.push(routes.auth.signup.email); })
		;

		// Try to get current location if it did not
		// set with previous route props
		if (!this.props.location.state) {
			axiosInstance.get(api.external.location)
				.then(response => this.setState({currentCountryData: {
					code: response.data.calling_code,
					country: {
						value: response.data.country_code,
						disp: response.data.country_name
					}
				}}))
				.catch(err => console.log(_.get(err, 'response.data.message', err)))
			;
		}
	}

	render() {
		const locationState = this.props.location.state || this.state.currentCountryData;

		return (
		<>
			<Helmet>
				<title>{ 'Sign Up - Link a Telegram Account' }</title>
			</Helmet>

			<FormRoot wrapper="form" name="phone" inject={ authFormStore }
				styles={ containerStyles.phone_form }
			>

				{/* Title */}
				<h1>{ 'Link your telegram account' }</h1>

				{/* Content */}
				{
					!this.state.userConfirmed ? <p>{ 'Loading' }</p>
						: (<>

							{/* Select country */}
							<Dropdown name="country" value={ locationState.country }
								options={ locationState.countriesList }
								map={['alpha2Code', 'name']}
								source={ locationState.countriesList ? null : api.external.countries }
								onBlur={
									v => {
										const country = _.filter(locationState.countriesList, c => c.alpha2Code === v.value);
										if (!_.isEmpty(country)) {
											authFormStore.getField('code').changeValue(_.get(country, '0.callingCodes.0'));
										}
									}
								}
							/>

							{/* Deal code */}
							<Input name="code" icon="fas fa-plus"
								placeholder="Code"
								value={ locationState.code }
								validators={[ required ]}
								mask={ integersOnly }
								onChange={
									e => {
										const country = _.filter(locationState.countriesList, c => c.callingCodes[0] === e.target.value);
										authFormStore.getField('country').changeValue(
											country.length === 1
												? { value: country[0].alpha2Code, disp: country[0].name }
												: { value: 'unknown', disp: 'Unknown country' }
										);
									}
								}
							/>

							{/* Phone number */}
							<Input name="phone"
								placeholder="Phone number"
								validators={[ required ]}
								mask={ integersOnly }
							/>

							{/* Secure code */}
							{
								this.state.codeSent
									? <Input name="secure_code"
										placeholder="Security code"
										mask={{ mask: '00000' }}
										validators={[
											required,
											value => length(value, { min: 5, max: 5 })
										]}
									/>
									: null
							}

							{/* Submit request */}
							<Submit title={ this.state.codeSent ? 'Continue' : 'Request Secure Code' } form={ authFormStore }
								styles={{ theme: containerStyles.btn }}
								noSend={ true }
								onGetData={
									(valid, data) => {

										// If form is valid
										// and code can be send to the user
										if (valid && !this.state.codeSent) {

											// Display code input in order not to make user
											// waiting while all cheks will be done
											this.setState({
												codeSent: true,
												msg: SECURE_CODE_HAS_BEEN_SENT
											});

											// Check if number is registered in Telegram
											// and send a secure code
										}

										// If code has been already sent
										// submit received code
										if (valid && this.state.codeSent) {

											// With TEST mode on do not contact telegram servers
											// just consider that its response would return OK
											axiosInstance.put(api.auth.signup, { id: this.userId, ...data })
												.then(() => {
													canUseDOM() && localStorage.setItem('authenticated', 'yes');
													history.push(routes.workflow.self);
												})
												.catch(err => this.setState({ msg: CANT_ACTIVATE_NEW_USER_AFTER_SIGNUP }))
											;
										}
									}
								}
							/>

							{/* Errors or user message */}
							{
								this.state.codeSent === false
									? <p>{ 'Code can not be sent' }</p>
									: this.state.codeSent === true
										? <p>{ `Code has been sent` }</p>
										: null
							}

						</>)
				}

			</FormRoot>
		</>
		);
	}
}
