import { validators } from '@scc/form';

// Destruct imported validators
const { required, email, regexp } = validators;

/**
 * Custom validators
 */
export const customValidators = {

	// Email
	email: {
		required: (v: string) => required(v, { message: 'Email is required' }),
		valid: (v: string) => email(v, { message: 'Please enter correct email' }),
		optional: (v: string) => !v || email(v) === true ? true : email(v, { message: 'Please enter correct email' })
	},

	// Password
	password: {
		required: (v: string) => required(v, { message: 'Password is required' }),
		match: (v: string, match: string) => v === match ? true : 'Passwords not match',
		requirements: (v: string) => regexp(v, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&.]{8,}$/, (v: any) => v, {
			message: 'More then 8 symbols and number required'
		})
	}
};
