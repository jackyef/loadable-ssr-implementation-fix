/**
 * Set document height for mobiles
 */
export const appHeight = () => {
	const doc = document.documentElement;
	doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};
