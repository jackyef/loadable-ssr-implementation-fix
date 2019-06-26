/**
 * Logo
 */
import React from 'react';

import { history } from '../../routes';
import { routes } from '../../config';

// Styles
import importedStyles from './Logo.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
};

type Props = {

	/**
	 * Display text or only logo picto
	 */
	noText?: boolean;
};

const defaultProps: Partial<Props> = {
	noText: false
};

/**
 * Logo
 */
export const Logo: React.FC<Props> = React.memo(({ noText }) => {
	return (
		<div className={ styles.self }
			onClick={ () => history.push(routes.home) }
		>
			{
				!noText && (
					<div>
						<span>{'Poster App'}</span>
						<span>{'for Telegram'}</span>
					</div>
				)
			}
		</div>
	);
});

Logo.defaultProps = defaultProps;
