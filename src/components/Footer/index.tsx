/**
 * @module Footer
 */
import React from 'react';
import { useTheme } from 'styled-components';

import { Button, MEDIA, Theme } from '@tg/elm';

import { ContentBlock } from '../ContentBlock';
import { routes } from '../../config';

import {
	StyledContent,
	StyledLogo,
	StyledNav
} from './_styled';

/**
 * Component
 */
export const Footer: React.FC<{}> = () => {
	const theme = useTheme() as Theme;
	return (
		<ContentBlock as="footer" bg="white_100" x={ theme.space[11] } y={ theme.space[6] }
			media={ {
				[MEDIA.DESKTOP_NARROW]: { big: [theme.space[9], theme.space[5]] },
				[MEDIA.TABLET]: { big: [theme.space[5], theme.space[5]] },
				[MEDIA.MOBILE]: { big: [theme.space[5], theme.space[5]] }
			} }
		>
			<StyledContent>
				<StyledLogo textOnly />
				<StyledNav>
					<Button nav variant="nav" size="mid" title="Contact Us" />
					<Button nav variant="nav" size="mid" title="Join our Channel" />
					<Button nav variant="nav" size="mid" onClick={ () => routes.pp } title="Terms and Privacy" />
				</StyledNav>
			</StyledContent>
		</ContentBlock>
	);
};
