/**
 * Utils to manipulate strings
 */
export const shortNumber = (num: number = 0) => {
	if (num < 1000) { return num; }
	return `${ (num / 1000).toFixed(1) }k`;
};
