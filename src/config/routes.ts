/**
 * Root app URL prefix path
 */
export const indexRoute = 'public';

/**
 * App routes
 */
export const routes = {

	// Home
	index: `/${ indexRoute }`,
	home: `/${ indexRoute }/home`,

	// Products (external)
	poster: '/post',
	market: '/market',

	// Public (internal)
	pricing: `/${ indexRoute }/pricing`,
	faq: `/${ indexRoute }/faq`,

	// Authentication
	auth: {
		self: `/${ indexRoute }/auth`,
		signin: `/${ indexRoute }/auth/in`,
		signup: `/${ indexRoute }/auth/up`
	}
};
