/**
 * Block at the bottom of the landing page
 * that repeat
 * @module GetStarted
 */
import React from 'react';

import { Headline } from '@tg/ui';

import { toSignUp } from '../';
import { ContentBlock, GetStarted as GetStartedForm } from '../../../../../components';

// Styles
import importedStyles from './GetStarted.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

/**
 * Component
 */
export const GetStarted: React.FC<{}> = () => (
	<ContentBlock className={styles.self}>
		<Headline h={1} variation="public">
			{'Ready to get started?'} <br/> {'Try it.'}
		</Headline>
		<p>{ 'Join now and get 3 months of free management for all your channels.' }</p>
		<GetStartedForm onClick={ toSignUp } />
	</ContentBlock>
);