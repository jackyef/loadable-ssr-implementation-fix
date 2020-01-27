/**
 * List of features where you can select one of them
 * in order to see some additional visual content that
 * describes selected feature
 * @module FeaturesSwitcher
 */
import _ from 'lodash';
import React, { useState, useEffect } from 'react';

// Styles
import importedStyles from './FeaturesSwitcher.module.less';
const styles: Styles = importedStyles;

type Styles = {
	self?: string;
	feature?: string;
	active?: string;
};

type Props = {

	/**
	 * Features
	 */
	features?: string[];

	/**
	 * Currently active feature
	 */
	active?: number;

	/**
	 * On switching between items
	 */
	onSwitch?: (index: number) => void;

	/**
	 * Styles
	 */
	className?: string;
};

const defaultProps: Partial<Props> = {
	active: 1,
	className: '',
	onSwitch: _.noop
};

/**
 * Component
 */
export const FeaturesSwitcher: React.FC<Props> = ({ features, onSwitch, className, active: activeProp }) => {

	// Active feature
	const [active, setActive] = useState<number>(activeProp);

	// Reset active feature from changed prop
	useEffect(() => { setActive(activeProp); }, [activeProp]);

	// Render
	return (
		<ul className={ `${ styles.self } ${ className }` }>
			{
				_.map(features, (feature, index) => {
					const current = index + 1;
					return (
						<li key={ index } onClick={ () => { setActive(current); onSwitch(current); } }
							className={ `
								${ styles.feature }
								${ current === active ? styles.active : '' }
							` }
						>
							{ feature }
						</li>
					);
				})
			}
		</ul>
	);
};

FeaturesSwitcher.defaultProps = defaultProps;
