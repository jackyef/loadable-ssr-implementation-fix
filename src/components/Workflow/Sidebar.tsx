/**
 * Sidebar component
 */
import React from 'react';

import { styles as defaultStyles } from '../../styles/components/Workflow/Sidebar';

type Props = {
	styles?: any;
};

/**
 * Sidebar component
 */
const Sidebar: React.SFC<Props> = ({ children, styles }) => (
	<aside className={`${ defaultStyles.self } ${ styles }`}>
		{ children }
	</aside>
);

export default Sidebar;
