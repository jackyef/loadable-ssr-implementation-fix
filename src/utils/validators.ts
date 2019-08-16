import { validators } from '@scc/form';

// Destruct imported validators
const { required, email } = validators;

/**
 * Custom validators
 */
export const customValidators = {

	// Email
	email: {
		required: (v: string) => required(v, { message: 'Email is required' }),
		valid: (v: string) => email(v, { message: 'Please enter correct email' })
	},

	// Password
	password: {
		required: (v: string) => required(v, { message: 'Password is required' }),
		match: (v: string, match: string) => v === match ? true : 'Passwords not match'
	}
};
