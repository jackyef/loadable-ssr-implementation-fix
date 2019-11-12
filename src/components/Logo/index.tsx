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
	 * Display text or only logo pic
	 */
	noText?: boolean;

	/**
	 * Click on logo
	 */
	onClick?: () => any;
};

const defaultProps: Partial<Props> = {
	noText: false,
	onClick: () => history.push(routes.home)
};

/**
 * Logo
 */
export const Logo: React.FC<Props> = React.memo(({ noText, onClick }) => {
	return (
		<div className={ styles.self } onClick={ onClick }>
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
