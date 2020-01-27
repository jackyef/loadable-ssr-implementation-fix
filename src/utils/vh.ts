/**
 * Set document height for mobiles
 */
export const appHeight = (): void => {
	const doc = document.documentElement;
	doc.style.setProperty('--app-height', `${ window.innerHeight }px`);
};
