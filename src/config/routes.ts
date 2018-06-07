/**
 * Root app route
 */
const indexRoute = '/app';

/**
 * App routes
 */
export const routes = {
	index: indexRoute,
	home: `${ indexRoute }/home`,
	phone: `${ indexRoute }/phone`,
	auth: {
		self: `${ indexRoute }/auth`,
		signin: `${ indexRoute }/auth/in`,
		signup: {
			self: `${ indexRoute }/auth/up`,
			email: `${ indexRoute }/auth/up/email`,
			phone: `${ indexRoute }/auth/up/phone`
		}
	}
};
