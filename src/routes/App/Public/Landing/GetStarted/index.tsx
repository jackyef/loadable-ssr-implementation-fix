/**
 * Block at the bottom of the landing page
 * that repeat
 * @module GetStarted
 */
import React from 'react';

import { Heading } from '@tg/elm';

import { toSignUp } from '../';
import { ContentBlock, GetStarted as GetStartedForm } from 'app/components';

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
	<ContentBlock className={ styles.self }>
		<Heading h={ 1 }>
			{'Ready to get started?'} <br/> {'Try it.'}
		</Heading>
		<p>{ 'Join now and get 3 months of free management for all your channels.' }</p>
		<GetStartedForm onClick={ toSignUp } />
	</ContentBlock>
);
