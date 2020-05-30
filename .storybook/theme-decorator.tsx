import React from 'react';
import { ThemeProvider } from '@tg/styled';

import { theme } from '@tg/elm';

const ThemeDecorator = (storyFn: any) => (
	<ThemeProvider theme={ theme }>
		{ storyFn() }
	</ThemeProvider>
);

export default ThemeDecorator;
