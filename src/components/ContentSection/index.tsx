/**
 * Simple layout wrapper that provides only two things:
 * - Wrapper tag (predefined to section)
 * - Styles (predefined CSS module)
 * @module ContentSection
 */
import React from 'react';

const _styles: Styles = require('./ContentSection.module.less');

type Styles = {
	self?: string;

	rulers__no?: string;
	rulers__normal?: string;
	rulers__narrow?: string;
};

type Props = {

	/**
	 * Section content layout
	 * @default null
	 */
	children: React.ReactNode;

	/**
	 * Actually this is a horizontal padding for the section
	 * Examples:
	 * - Pricing, Features, Promo have a normal rulers ('normal')
	 * - Preview Slider has no rulers ('no')
	 * - And lists sections should have less width corresponding
	 *   to normal rulers section ('narrow')
	 */
	rulers?: 'no' | 'normal' | 'narrow';

	/**
	 * Additional styles such as positioning inside section
	 */
	styles?: string;
};

const defaultProps: Partial<Props> = {
	rulers: 'normal',
	styles: ''
};

/**
 * Content section component used on public pages
 */
const ContentSection: React.SFC<Props> = ({ children, rulers, styles }) => (
	<section className={`${ _styles.self } rulers__${ rulers } ${ styles }`}>
		{ children }
	</section>
);

ContentSection.defaultProps = defaultProps;

export default ContentSection;
