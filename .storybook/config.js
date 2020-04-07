import { configure, addDecorator, addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import themeDecorator from './theme-decorator';
import routerDecorator from './router-decorator';

// styled Theme
addDecorator(themeDecorator);
addDecorator(routerDecorator);

// Sort stories by alphabet
addParameters({
	options: {
		storySort: (a, b) => a[1].id.localeCompare(b[1].id),
	},
});

addParameters({
	viewport: {
		viewports: INITIAL_VIEWPORTS
	}
});
