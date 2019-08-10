/**
 * Demo section for Landing page.
 * Should include short video/gif demonstration
 * (maybe with tabs for different product sections)
 * @module Demo
 */
import React from 'react';

import { resources } from '@tg/ui/dist/resources';

import { ContentBlock } from '../../../../../components';

import importedStyles from './Demo.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

type Props = {
	className?: string;
};

const defaultProps: Partial<Props> = {
	className: ''
};

export const Demo: React.FC<Props> = ({ className }) => (
	<ContentBlock className={`${styles.self} ${className}`}>
		<div>
			<img src={ resources.demo } />
		</div>
	</ContentBlock>
);

Demo.defaultProps = defaultProps;
