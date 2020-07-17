/**
 * Editor illustration with short description
 * and main features list
 *
 * @module Editor
 */
import React, { Ref } from 'react';
import { Code, Eye, Heart, Image, File } from 'react-feather';

import styled, { CSS } from '@prostpost/styled';

import {
	colors,
	Heading,
	Text,
	Img,
	flex,
	mediaQueries,
	MEDIA,
	Paragraph,
	ContentBlock
} from '@prostpost/elm';

import { resources } from '@prostpost/resources';

type Props = {
	ref?: Ref<HTMLElement>;
};

const StyledContainer = styled.div`
	/* stylelint-disable value-keyword-case */

	${ flex({
		align: 'center',
		justify: 'space-between'
	}) }

	${ mediaQueries[MEDIA.TABLET] } {
		justify-content: center;
	}

	${ mediaQueries[MEDIA.MOBILE] } {
		flex-direction: column-reverse;
	}
`;

const StyledImg = styled(Img)`
	width: 50%;
	margin-right: ${ ({ theme }): CSS => theme.space[7] };

	${ mediaQueries[MEDIA.MOBILE] } {
		width: 100%;
		margin-top: ${ ({ theme }): CSS => theme.space[7] };
	}
`;

const StyledList = styled.div`
	width: 390px;

	${ mediaQueries[MEDIA.MOBILE] } {
		width: 100%;
	}
`;

const StyledFeaturesContainer = styled.div`
	margin-top: ${ ({ theme }): CSS => theme.space[7] };

	${ mediaQueries[MEDIA.MOBILE] } {
		margin-top: ${ ({ theme }): CSS => theme.space[5] };
	}
`;

const StyledLiFeature = styled.li`

	margin-bottom: ${ ({ theme }): CSS => theme.space[3] };

	list-style: none;

	${ flex({
		align: 'center'
	}) }
`;

/**
 * Component
 */
export const Editor: React.FC<Props> = React.forwardRef((props, ref) => (
	<ContentBlock ref={ ref }>
		<StyledContainer>

			{/* Illustration  */}
			<StyledImg src={ resources.editor_demo } />

			{/* Info */}
			<StyledList>

				{/* Title & description */}
				<Text size={ 12 } color="blue_100">{ 'Create' }</Text>
				<Heading mb={ 3 } h={ 2 } title="Create post from draft to full post" />
				<Paragraph size={ 18 }>{
					'Unleash your creativity, plan projects from all angles, and ' +
					'create centralized hubs of information to keep everyone in the loop.'
				}</Paragraph>

				{/* List of features */}
				<StyledFeaturesContainer>
					<StyledLiFeature>
						<Code size={ 18 } color={ colors.blue_30 } />
						<Paragraph ml={ 4 } size={ 18 } color="blue_30">
							{ 'Text editor with markup' }
						</Paragraph>
					</StyledLiFeature>
					<StyledLiFeature>
						<Eye size={ 18 } color={ colors.blue_30 } />
						<Paragraph ml={ 4 } size={ 18 } color="blue_30">
							{ 'Link preview settings' }
						</Paragraph>
					</StyledLiFeature>
					<StyledLiFeature>
						<Heart size={ 18 } color={ colors.blue_30 } />
						<Paragraph ml={ 4 } size={ 18 } color="blue_30">
							{ 'Reaction buttons' }
						</Paragraph>
					</StyledLiFeature>
					<StyledLiFeature>
						<Image size={ 18 } color={ colors.blue_30 } />
						<Paragraph ml={ 4 } size={ 18 } color="blue_30">
							{ 'Images and galleries' }
						</Paragraph>
					</StyledLiFeature>
					<StyledLiFeature>
						<File size={ 18 } color={ colors.blue_30 } />
						<Paragraph ml={ 4 } size={ 18 } color="blue_30">
							{ 'Create post from template' }
						</Paragraph>
					</StyledLiFeature>
				</StyledFeaturesContainer>
			</StyledList>
		</StyledContainer>
	</ContentBlock>
));

Editor.displayName = 'Editor';
