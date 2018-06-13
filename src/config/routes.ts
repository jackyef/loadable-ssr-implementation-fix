/**
 * Root app route
 */
const indexRoute = '/';

/**
 * App routes
 */
export const routes = {
	index: indexRoute,
	home: `${ indexRoute }/home`,
	auth: {
		self: `${ indexRoute }/auth`,
		signin: `${ indexRoute }/auth/in`,
		signup: `${ indexRoute }/auth/up`
	}
};
