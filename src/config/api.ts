import axios from 'axios';

// API domains
const domain = '/api';

/**
 * API routes
 */
export const api = {

	// External
	external: {
		countries: 'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;callingCodes',
		location: 'https://api.ipdata.co'
	},

	// Messages
	msg: {
		get: `${ domain }/msg`
	},

	// Authentication
	auth: {
		google: `${ domain }/auth/google`,
		twitter: `${ domain }/auth/twitter`,
		register: `${ domain }/auth/register`,
		checkUser: `${ domain }/auth/check`,
		signup: `${ domain }/auth/signup`,
		logout: `${ domain }/auth/logout`,
		login: `${ domain }/auth/login`
	},

	// Posts and channels
	data: {
		posts: `${ domain }/posts/1185462958`
	}
};

/**
 * App axios instance
 */
export const axiosInstance = axios.create({});
