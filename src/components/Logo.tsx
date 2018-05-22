/**
 * Logo component
 */
import React from 'react';

import { BtnNav } from '@scc/scc-ui-kit';

import { routes } from '../config';

import { styles } from '../styles/components/Logo';

type Props = {
	workflow?: boolean;
};

const defaultProps: Partial<Props> = {
	workflow: false
};

/**
 * Logo component
 */
const Logo: React.SFC<Props> = ({ workflow }) => (
	<div className={ styles.self }>
		<BtnNav url={ workflow ? routes.workflow.self : routes.home } />
	</div>
);

Logo.defaultProps = defaultProps;

export default Logo;
