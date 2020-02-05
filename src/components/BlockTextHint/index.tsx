/**
 * Small text hint above Landing block header title
 */
import React, { memo } from 'react';

// Styles
import importedStyles from './BlockTextHint.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

type Props = {
	text?: string;
	className?: string;
};

const defaultProps: Partial<Props> = {
	text: '',
	className: ''
};

/**
 * Component
 */
export const BlockTextHint: React.FC<Props> = memo(({ text, className }) => (
	<span className={ `${ styles.self } ${ className }` }>{ text }</span>
));

BlockTextHint.defaultProps = defaultProps;
