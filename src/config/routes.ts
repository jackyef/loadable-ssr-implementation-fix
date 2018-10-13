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
	home: '/home',

	// Products (external)
	poster: '/post/dashboard',
	market: '/market',

	// Public (internal)
	pricing: '/pricing',
	faq: '/faq',

	// Authentication
	auth: {
		self: '/auth',
		signin: '/auth/in',
		signup: '/auth/up'
	}
};
