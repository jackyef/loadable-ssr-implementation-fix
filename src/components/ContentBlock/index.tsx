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
	space,
	Space
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
	x?: string;

	/**
	 * Padding Y
	 */
	y?: string;

	/**
	 * Theme object
	 */
	theme?: Theme;
};

type SizeMap = { [key: string]: [Space, Space] };

const sizeMap: SizeMap = {
	big: [space[9], space[10]]
};

const defaultProps: Partial<Props> = {
	bg: 'white_100',
	size: 'big',
	className: '',
	media: {
		[MEDIA.MOBILE]: {
			big: [space[7], space[7]]
		},
		[MEDIA.TABLET]: {
			big: [space[9], space[8]]
		},
		[MEDIA.DESKTOP_NARROW]: {
			big: [space[9], space[9]]
		}
	}
};

const StyledContentBlock = styled.section<Props>`
	/* stylelint-disable declaration-colon-newline-after */

	padding: ${ ({ size, x, y }) => `
		${ y ? y : sizeMap[size][1] }
		${ x ? x : sizeMap[size][0] }
	` };

	background: ${ ({ bg, theme }) => theme.colors[bg] };

	> div {
		width: 100%;
		max-width: calc(1366px - ${ ({ size, x }) => `${ parseInt(x ? x : sizeMap[size][0], 10) * 2 }px` });
		margin: 0 auto;
	}

	${ mediaQueries[MEDIA.DESKTOP_NARROW] } {
		padding: ${ ({ media, size, y }) => {
			const comb = { ...defaultProps.media, ...media };
			const r = comb[MEDIA.DESKTOP_NARROW][size][1];
			const v = `${
				y &&
				r === _.get(defaultProps.media, `${ MEDIA.DESKTOP_NARROW }.${ size }.1`)
				? y : r
			}px`;
			const h = comb[MEDIA.DESKTOP_NARROW][size][0];
			return `${ v } ${ h }`;
		} };
	}

	${ mediaQueries[MEDIA.TABLET] } {
		padding: ${ ({ media, size, y }) => {
			const comb = { ...defaultProps.media, ...media };
			const r = comb[MEDIA.TABLET][size][1];
			const v = y && r === _.get(defaultProps.media, `${ MEDIA.TABLET }.1`) ? y : r;
			const h = comb[MEDIA.TABLET][size][0];
			return `${ v } ${ h }`;
		} };
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		overflow: hidden;
		padding: ${ ({ media, size, y }) => {
			const comb = { ...defaultProps.media, ...media };
			const r = comb[MEDIA.MOBILE][size][1];
			const v = y && r === _.get(defaultProps.media, `${ MEDIA.MOBILE }.1`) ? y : r;
			const h = comb[MEDIA.MOBILE][size][0];
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
