import { RefObject } from 'react';
import { TypeBtnStyle } from '@tg/elm';

type TypeNavBtn = {
	title?: string;
	nav?: boolean;
	style?: TypeBtnStyle;
};

/**
 * Generate navigation button props
 * @param {string} title Button's title
 * @param {boolean} nav Navigation or not
 * @returns {*} Button props
 */
export const commonNavBtnProps = (title: string, nav: boolean = false): TypeNavBtn => {
	const style: TypeBtnStyle = { main: 'nav' };
	return { style, nav, title };
};

/**
 * Scroll to
 * @param scroller Scroller object
 * @param ref React ref for scroller
 * @param {number} offset Number of pixels to offset scroll position
 */
export const scroll = (scroller: any, ref?: RefObject<any>, offset: number = 0): void => {

	// Check if we use native scroll or custom
	const scrollEl = scroller.scrollerElement.classList.contains('native')
		? document.scrollingElement || document.documentElement
		: scroller.scrollerElement
	;

	// Scroll to block
	scrollEl.scrollTo({
		behavior: 'smooth',
		left: 0,
		top: ref ? ref.current.offsetTop + offset : 0
	});
};
