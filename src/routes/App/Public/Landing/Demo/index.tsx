/**
 * Demo section for Landing page.
 * Should include short video/gif demonstration
 * (maybe with tabs for different product sections)
 * @module Demo
 */
import React from 'react';
import Scrollbar from 'react-scrollbars-custom';

import { resources } from '@tg/resources';

import { ContentBlock } from '../../../../../components';

import importedStyles from './Demo.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	hideTrack?: string;
	scrollbars?: string;
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
			{/* For desktop & tablets */}
			<img src={ resources.demo } />

			{/* For mobiles */}
			<Scrollbar width="100%" height="400px"
				className={styles.scrollbars}
				trackXProps={{ className: styles.hideTrack }}
				thumbXProps={{ className: styles.hideTrack }}
				trackYProps={{ className: styles.hideTrack }}
				thumbYProps={{ className: styles.hideTrack }}
			>
				<img src={ resources.demo } />
			</Scrollbar>
		</div>
	</ContentBlock>
);

Demo.defaultProps = defaultProps;
