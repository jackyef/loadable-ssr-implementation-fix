/**
 * Demo section for Landing page.
 * Should include short video/gif demonstration
 * (maybe with tabs for different product sections)
 *
 * @module Demo
 */
import React from 'react';

import { resources } from '@tg/resources';

import {
	StyledContentBlock,
	StyledScrollbars,
	InnerWrapper,
	OuterWrapper,
	StyledImg
} from './_styled';

import importedStyles from './Demo.module.less';
const styles: Styles = importedStyles;

type Styles = {
	hideTrack?: string;
};

type Props = {
	className?: string;
};

const defaultProps: Partial<Props> = {
	className: ''
};

export const Demo: React.FC<Props> = ({ className }) => (
	<StyledContentBlock className={ className }>
		<OuterWrapper>
			<InnerWrapper>
				{/* For desktop & tablets */}
				{/* TODO: Replace with video */}
				<StyledImg src={ resources.demo } />

				{/* For mobiles */}
				<StyledScrollbars
					trackXProps={ { className: styles.hideTrack } }
					thumbXProps={ { className: styles.hideTrack } }
					trackYProps={ { className: styles.hideTrack } }
					thumbYProps={ { className: styles.hideTrack } }
				>
					{/* TODO: Replace with video */}
					<StyledImg src={ resources.demo } />
				</StyledScrollbars>
			</InnerWrapper>
		</OuterWrapper>
	</StyledContentBlock>
);

Demo.defaultProps = defaultProps;
