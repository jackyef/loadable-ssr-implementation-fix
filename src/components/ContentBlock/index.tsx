/**
 * Content block - wrapper that contains
 * all logical block's content
 */
import React, { Ref } from 'react';

import { Wrapper } from '@tg/kit-elm';

// Styles
import importedStyles from './ContentBlock.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

type Props = {

	/**
	 * Ref
	 */
	ref?: Ref<any>;

	/**
	 * Block's content
	 */
	children: any;

	/**
	 * HTML container tag
	 * @default section
	 */
	wrapper?: string;

	/**
	 * Additional user's styles
	 */
	className?: string;
};

const defaultProps: Partial<Props> = {
	wrapper: 'section',
	className: ''
};

/**
 * Component
 */
export const ContentBlock: React.FC<Props> = React.forwardRef(({ children, className, wrapper }, ref) => (
	<Wrapper wrapper={ wrapper } getRef={ ref as any } styles={ `${ styles.self } ${ className }` }>
		<div>
			{ children }
		</div>
	</Wrapper>
));

ContentBlock.defaultProps = defaultProps;
