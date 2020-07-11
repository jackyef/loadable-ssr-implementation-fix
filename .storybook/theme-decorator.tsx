import React from 'react';
import { ThemeProvider } from '@prostpost/styled';

import { theme } from '@prostpost/elm';

const ThemeDecorator = (storyFn: any) => (
	<ThemeProvider theme={ theme }>
		{ storyFn() }
	</ThemeProvider>
);

export default ThemeDecorator;
