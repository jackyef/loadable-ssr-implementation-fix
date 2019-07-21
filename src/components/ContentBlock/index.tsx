/**
 * Content block - wrapper that contains
 * all logical block's content
 */
import React from 'react';

// Styles
import importedStyles from './ContentBlock.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

type Props = {

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
export const ContentBlock: React.FC<Props> = ({ children, className }) => (
	<section className={`${ styles.self } ${ className || '' }`}>
		{ children }
	</section>
);
