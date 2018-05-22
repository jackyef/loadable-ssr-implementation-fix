type Styles = {

	// Sidebar
	sidebar?: {
		channels?: any;
		bottom?: any;
	};

	// Content
	content?: {
		self?: any;
	};
};

const _styles = require('./Workflow.module.less');

export const styles: Styles = {

	// Sidebar
	sidebar: {
		channels: _styles.sidebar_channels,
		bottom: _styles.bottom
	},

	// Content
	content: {
		self: _styles.content
	}
};
