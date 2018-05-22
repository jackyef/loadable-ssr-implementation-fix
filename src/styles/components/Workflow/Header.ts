type Styles = {
	self?: any;
	new_post_btn?: any;
	views?: {
		green?: any;
		red?: any;
	};
};

const _styles = require('./Header.module.less');

export const styles: Styles = {
	self: _styles.self,
	new_post_btn: _styles.new_post,
	views: {
		green: _styles.views_green,
		red: _styles.views_red
	}
};
