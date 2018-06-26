/**
 * Main public logo
 */
import React from 'react';
import { History } from 'history';

import { styles } from '../../styles/components/Elements/Logo';

type Props = {

	/*
	 * URL to redirect on click
	 */
	to?: string;

	/**
	 * History object to provide URL push
	 */
	history: History;
};

const defaultProps: Partial<Props> = {
	to: '/'
};

/**
 * Main public logo
 */
const Logo: React.SFC<Props> = ({ to, history }) => {
	return (
		<div className={ styles.self } onClick={ () => history.push(to) }>
			<img src="/static/public/images/logo.svg" />
			<span>{ 'Platformgram' }</span>
		</div>
	);
};

Logo.defaultProps = defaultProps;

export default Logo;
