/**
 * List of features where you can select one of them
 * in order to see some additional visual content that
 * describes selected feature
 * @module FeaturesSwitcher
 */
import _ from 'lodash';
import React, { useState, useEffect } from 'react';

import { Feature, Props as FeatureProps } from './Feature';

type Props = {

	/**
	 * Features
	 */
	features?: FeatureProps[];

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
		<ul className={ className }>
			{
				_.map(features, ({ title, desc, icon }, index) => {
					const current = index + 1;
					return (
						<Feature key={ title }
							active={ current === active }
							title={ title }
							desc={ desc }
							icon={ icon }
							onClick={ () => {
								setActive(current);
								onSwitch(current);
							} }
						/>
					);
				})
			}
		</ul>
	);
};

FeaturesSwitcher.defaultProps = defaultProps;
