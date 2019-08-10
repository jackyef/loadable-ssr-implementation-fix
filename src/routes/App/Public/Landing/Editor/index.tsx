/**
 * Editor illustration with short description
 * and main features list
 * @module Editor
 */
import React from 'react';

import { ContentBlock } from '../../../../../components';

import { Headline } from '@tg/ui';
import { resources } from '@tg/ui/dist/resources';

// Styles
import importedStyles from './Editor.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	right?: string;
	features?: string;
};

/**
 * Component
 */
export const Editor: React.FC<{}> = () => (
	<ContentBlock className={styles.self}>

		{/* Illustration */}
		<img alt="Editor features" src={ resources.editor_demo } />

		{/* Info */}
		<div className={ styles.right }>

			{/* Title & description */}
			<Headline h={2} variation="public" title="Create post from draft to full post" />
			<p>{
				'Unleash your creativity, plan projects from all angles, and ' +
				'create centralized hubs of information to keep everyone in the loop.'
			}</p>

			{/* List of features */}
			<ul className={ styles.features }>
				<li><span>{'1.'}</span>{ 'Text editor with markup' }</li>
				<li><span>{'2.'}</span>{ 'Link preview settings' }</li>
				<li><span>{'3.'}</span>{ 'Add reaction buttons' }</li>
				<li><span>{'4.'}</span>{ 'Images and galleries' }</li>
				<li><span>{'5.'}</span>{ 'Create from templates' }</li>
			</ul>
		</div>

	</ContentBlock>
);
