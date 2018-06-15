/**
 * Root app URL prefix path
 */
export const indexRoute = `/public`;

/**
 * App routes
 */
export const routes = {
	index: `${ indexRoute }`,
	home: `${ indexRoute }`,
	auth: {
		self: `${ indexRoute }/auth`,
		signin: `${ indexRoute }/auth/in`,
		signup: `${ indexRoute }/auth/up`
	}
};
