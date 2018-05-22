/**
 * Sidebar control component
 */
import _ from 'lodash';
import React from 'react';

import { Icon } from '@scc/scc-ui-kit';

import { styles as defaultStyles } from '../../styles/components/Workflow/SidebarBtn';

type Props = {

	/**
	 * Text to display (will display first letter only)
	 */
	text?: string;

	/**
	 * Disable tooltip
	 */
	noTooltip?: boolean;

	/**
	 * Tooltip text
	 */
	tooltipText?: string;

	/**
	 * Icon
	 */
	icon?: string;

	/**
	 * On click callback
	 */
	onClick?: (e: any) => void;

	/**
	 * Additional styles
	 */
	styles?: any;
};

const defaultProps: Partial<Props> = {
	noTooltip: false,
	icon: null,
	onClick: _.noop,
	styles: ''
};

/**
 * Sidebar control button component
 */
const SidebarBtn: React.SFC<Props> = ({ text, tooltipText, icon, noTooltip, styles, onClick }) => (
	<div onClick={ onClick } className={`${ defaultStyles.self } ${ styles }`}>
		{ icon ? <Icon icon={ icon } /> : <span>{ _.capitalize(text[0]) }</span> }
		{ !noTooltip ? <div>{ tooltipText || text }</div> : null }
	</div>
);

SidebarBtn.defaultProps = defaultProps;

export default SidebarBtn;
