/**
 * Root app URL prefix path
 */
export const indexRoute = '/public';

/**
 * App routes
 */
export const routes = {

	// Home
	index: '/',
	home: '/',

	// Products (external)
	poster: '/post/dashboard',

	// Privacy Policy (and Terms of use)
	pp: '/pp',

	// Authentication
	auth: {
		self: '/auth',
		signin: '/auth/in',
		signup: '/auth/up',
		reset: '/auth/reset',
		password: '/auth/password'
	}
};
