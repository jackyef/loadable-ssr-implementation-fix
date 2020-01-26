import { RefObject } from 'react';
import { TypeBtnStyle } from '@tg/elm';

/**
 * Generate navigation button props
 */
export const commonNavBtnProps = (title: string, nav: boolean = false) => {
	const style: TypeBtnStyle = { main: 'nav' };
	return { style, nav, title };
};

/**
 * Scroll to
 */
export const scroll = (scroller: any, ref?: RefObject<any>, offset: number = 0) => {

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
