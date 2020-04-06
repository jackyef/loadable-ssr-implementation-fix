/**
 * Content block - wrapper that contains
 * all logical block's content
 */
import _ from 'lodash';
import React, { Ref } from 'react';
import styled from 'styled-components';

import {
	MEDIA,
	AvailableMedia,
	mediaQueries,
	Color,
	Size,
	Theme,
	spacesNums as spaces
} from '@tg/elm';

export type Props = {

	/**
	 * Ref
	 */
	ref?: Ref<any>;

	/**
	 * Block's content
	 */
	children: any;

	/**
	 * Additional user's styles
	 */
	className?: string;

	/**
	 * Wrapper HTML tag
	 */
	as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;

	/**
	 * Background color
	 */
	bg?: Color;

	/**
	 * Size (paddings preset)
	 */
	size?: Size;

	/**
	 * Paddings for different media types
	 */
	media?: { [key in AvailableMedia]?: SizeMap };

	/**
	 * Padding X
	 */
	x?: number;

	/**
	 * Padding Y
	 */
	y?: number;

	/**
	 * Theme object
	 */
	theme?: Theme;
};

type SizeMap = { [key in Size]?: [number, number] };

const sizeMap: SizeMap = {
	big: [spaces[72], spaces[96]]
};

const defaultProps: Partial<Props> = {
	bg: 'white_100',
	size: 'big',
	className: '',
	media: {
		[MEDIA.MOBILE]: {
			big: [spaces[48], spaces[16]]
		},
		[MEDIA.TABLET]: {
			big: [spaces[72], spaces[32]]
		},
		[MEDIA.DESKTOP_NARROW]: {
			big: [spaces[72], spaces[72]]
		}
	}
};

const StyledContentBlock = styled.section<Props>`
	/* stylelint-disable declaration-colon-newline-after */

	padding: ${ ({ size, x, y }) => `
		${ y === 0 || y ? y : sizeMap[size][1] }px
		${ x === 0 || x ? x : sizeMap[size][0] }px
	` };

	background: ${ ({ bg, theme }) => theme.colors[bg] };

	> div {
		width: 100%;
		max-width: calc(1366px - ${ ({ size, x }) => `${ (x === 0 || x ? x : sizeMap[size][0]) * 2 }px` });
		margin: 0 auto;
	}

	${ mediaQueries[MEDIA.DESKTOP_NARROW] } {
		padding: ${ ({ media, size, y }) => {
			const comb = { ...defaultProps.media, ...media };
			const r = comb[MEDIA.DESKTOP_NARROW][size][1];
			const v = `${
				(y === 0 || y) &&
				r === _.get(defaultProps.media, `${ MEDIA.DESKTOP_NARROW }.${ size }.1`)
				? y : r
			}px`;
			const h = `${ comb[MEDIA.DESKTOP_NARROW][size][0] }px`;
			return `${ v } ${ h }`;
		} };
	}

	${ mediaQueries[MEDIA.TABLET] } {
		padding: ${ ({ media, size, y }) => {
			const comb = { ...defaultProps.media, ...media };
			const r = comb[MEDIA.TABLET][size][1];
			const v = `${ (y === 0 || y) && r === _.get(defaultProps.media, `${ MEDIA.TABLET }.1`) ? y : r }px`;
			const h = `${ comb[MEDIA.TABLET][size][0] }px`;
			return `${ v } ${ h }`;
		} };
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		overflow: hidden;
		padding: ${ ({ media, size, y }) => {
			const comb = { ...defaultProps.media, ...media };
			const r = comb[MEDIA.MOBILE][size][1];
			const v = `${ (y === 0 || y) && r === _.get(defaultProps.media, `${ MEDIA.MOBILE }.1`) ? y : r }px`;
			const h = `${ comb[MEDIA.MOBILE][size][0] }px`;
			return `${ v } ${ h }`;
		} };
	}
`;

/**
 * Component
 */
export const ContentBlock: React.FC<Props> = React.forwardRef(({ children, ...props }, ref) => {
	return (
		<StyledContentBlock ref={ ref } { ...props }>
			{ children }
		</StyledContentBlock>
	);
});

ContentBlock.defaultProps = defaultProps;
