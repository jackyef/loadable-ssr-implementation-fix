/**
 * Content block - wrapper that contains
 * all logical block's content
 */
import React, { Ref } from 'react';

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
	 * Additional user's styles
	 */
	className?: string;
};

/**
 * Component
 */
export const ContentBlock: React.FC<Props> = React.forwardRef(({ children, className }, ref) => (
	<section ref={ ref as any } className={`${ styles.self } ${ className || '' }`}>
		<div>
			{ children }
		</div>
	</section>
));
