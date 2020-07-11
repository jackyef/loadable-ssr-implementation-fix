import { BtnProps } from '@prostpost/elm';
import { Size } from '@prostpost/styled';

type TypeNavBtn = {
	title?: string;
	nav?: boolean;
	size?: Size;
	variant?: BtnProps['variant'];
};

/**
 * Generate navigation button props
 *
 * @param {string} title Button's title
 * @param {boolean} nav Navigation or not
 * @returns {*} Button props
 */
export const commonNavBtnProps = (title: string, nav = false): TypeNavBtn => {
	return {
		variant: 'nav',
		size: 'big',
		nav,
		title
	};
};
