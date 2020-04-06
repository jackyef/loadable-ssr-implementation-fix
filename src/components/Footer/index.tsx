/**
 * @module Footer
 */
import React from 'react';

import { Button, MEDIA } from '@tg/elm';

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
export const Footer: React.FC<{}> = () => (
	<ContentBlock as="footer" bg="white_100"
		x={ 150 }
		y={ 30 }
		media={ {
			[MEDIA.DESKTOP_NARROW]: { big: [75, 20] },
			[MEDIA.TABLET]: { big: [20, 20] },
			[MEDIA.MOBILE]: { big: [20, 20] }
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
