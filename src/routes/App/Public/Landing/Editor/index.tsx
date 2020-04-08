/**
 * Editor illustration with short description
 * and main features list
 * @module Editor
 */
import React, { Ref } from 'react';

import { ContentBlock } from 'app/components';

import { Heading, Text } from '@tg/elm';
import { resources, IconEye, IconTemplate, IconMd, IconHeart, IconImage } from '@tg/resources';

// Styles
import importedStyles from './Editor.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	right?: string;
	features?: string;
};

type Props = {
	ref?: Ref<any>;
};

/**
 * Component
 */
export const Editor: React.FC<Props> = React.forwardRef((props, ref) => (
	<ContentBlock ref={ ref } className={ styles.self }>

		{/* Illustration */}
		<img alt="Editor features" src={ resources.editor_demo } />

		{/* Info */}
		<div className={ styles.right }>

			{/* Title & description */}
			<Text size={ 12 } color="blue_100">{ 'Create' }</Text>
			<Heading h={ 2 } title="Create post from draft to full post" />
			<p>{
				'Unleash your creativity, plan projects from all angles, and ' +
				'create centralized hubs of information to keep everyone in the loop.'
			}</p>

			{/* List of features */}
			<ul className={ styles.features }>
				<li><IconMd />{ 'Text editor with markup' }</li>
				<li><IconEye />{ 'Link preview settings' }</li>
				<li><IconHeart />{ 'Reaction buttons' }</li>
				<li><IconImage />{ 'Images and galleries' }</li>
				<li><IconTemplate />{ 'Create post from template' }</li>
			</ul>
		</div>

	</ContentBlock>
));
