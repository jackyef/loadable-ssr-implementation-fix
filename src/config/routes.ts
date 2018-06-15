/**
 * Root app URL prefix path
 */
const idx = `/p`;

/**
 * App routes
 */
export const routes = {
	index: `${idx}`,
	home: `${idx}/home`,
	auth: {
		self: `${idx}/auth`,
		signin: `${idx}/auth/in`,
		signup: `${idx}/auth/up`
	}
};
