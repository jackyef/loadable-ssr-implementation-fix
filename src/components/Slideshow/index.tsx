/**
 * Simple slideshow for public presentation
 * purposes
 * @module Slideshow
 */
import _ from 'lodash';
import React from 'react';

const styles: Styles = require('./Slideshow.module.less');

type Styles = {
	self?: string;
	dots?: string;
	arrow?: string;
};

type Props = {
	settings?: any,
	images?: string[]
};

const defaultProps: Partial<Props> = {
	images: [],
	settings: {}
};

/**
 * Arrow component
 */
// const Arrow: React.SFC<{}> = () => (
// 	<div className={`${ styles.arrow }`}>
// 		<span>{ 'Arrow' }</span>
// 	</div>
// );

/**
 * Component
 */
const Slideshow: React.SFC<Props> = ({ settings, images }) => {

	return (
		<div className={ styles.self }>
			{ _.map(images, (image, index) => <img key={ index } src={ image } />) }
		</div>
	);
};

Slideshow.defaultProps = defaultProps;

export default Slideshow;
