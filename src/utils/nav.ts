import { RefObject } from 'react';
import { TypeBtnStyle } from '@tg/ui';

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
	scroller.scrollerElement.scrollTo({
		behavior: 'smooth',
		left: 0,
		top: ref ? ref.current.offsetTop + offset : 0
	});
};
